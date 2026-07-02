import { useEffect } from 'react';

export function useModalHistory(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!isOpen) return;

    // Push state when modal opens
    window.history.pushState({ modal: true }, "");

    const handlePopState = (e: PopStateEvent) => {
      // The back button was pressed, state was popped.
      // We just call onClose to close the modal.
      onClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      
      // If cleanup runs and we are still in the modal state (e.g. user clicked the 'X' button)
      // we need to back out of the history state we pushed so it doesn't linger.
      if (window.history.state?.modal) {
        window.history.back();
      }
    };
  }, [isOpen, onClose]);
}
