"use client";

import { useEffect, useState } from "react";

interface SmartLogoProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export function SmartLogo({ src, alt, className = "", containerClassName = "" }: SmartLogoProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Get background color from top-left pixel
      const bgR = data[0];
      const bgG = data[1];
      const bgB = data[2];
      
      const isWhiteBg = bgR > 240 && bgG > 240 && bgB > 240;
      const isBlackBg = bgR < 30 && bgG < 30 && bgB < 30;
      const isColoredBg = !isWhiteBg && !isBlackBg;
      
      const tolerance = 60; // Tolerance for artifacts and anti-aliasing
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        if (a === 0) continue;
        
        // Calculate color distance from background
        const dist = Math.sqrt(Math.pow(r - bgR, 2) + Math.pow(g - bgG, 2) + Math.pow(b - bgB, 2));
        
        if (dist < tolerance) {
          // Remove background
          data[i + 3] = 0;
        } else {
          // Foreground pixel
          if (isColoredBg) {
            // For colored backgrounds (e.g. orange, red) with white text:
            // We want the text to become the brand color (the background color).
            data[i] = bgR;
            data[i + 1] = bgG;
            data[i + 2] = bgB;
            
            // Smoothing for edges
            if (dist < tolerance + 40) {
              const alphaFactor = (dist - tolerance) / 40;
              data[i + 3] = Math.floor(a * alphaFactor);
            }
          } else {
            // For white/black backgrounds, just keep the original foreground pixel colors
            // (e.g., Dabur's colorful logo, DTC's white logo)
            // Smoothing for edges against white/black
            if (dist < tolerance + 40) {
              const alphaFactor = (dist - tolerance) / 40;
              data[i + 3] = Math.floor(a * alphaFactor);
            }
          }
        }
      }
      
      // Crop transparent space to fix visual sizing issues (LEDVANCE small, etc)
      // We will find the bounding box of the non-transparent pixels
      let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const alpha = data[(y * canvas.width + x) * 4 + 3];
          if (alpha > 10) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Create a new canvas to hold the cropped image
      if (maxX >= minX && maxY >= minY) {
        const cropCanvas = document.createElement("canvas");
        const cropWidth = maxX - minX + 1;
        const cropHeight = maxY - minY + 1;
        cropCanvas.width = cropWidth;
        cropCanvas.height = cropHeight;
        const cropCtx = cropCanvas.getContext("2d");
        
        if (cropCtx) {
          cropCtx.drawImage(canvas, minX, minY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
          if (isMounted) {
            setDataUrl(cropCanvas.toDataURL("image/png"));
          }
          return;
        }
      }
      
      if (isMounted) {
        setDataUrl(canvas.toDataURL("image/png"));
      }
    };
    
    img.src = encodeURI(src);
    
    return () => {
      isMounted = false;
    };
  }, [src]);

  if (!dataUrl) {
    return <div className={`animate-pulse bg-white/5 rounded-md ${containerClassName}`} />;
  }

  return (
    <div className={`relative flex items-center justify-center ${containerClassName}`}>
      <img 
        src={dataUrl} 
        alt={alt} 
        className={`w-auto h-full object-contain ${className}`}
      />
    </div>
  );
}
