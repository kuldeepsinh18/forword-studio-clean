# Clean Git History Script

Write-Host "Starting Git History Cleanup for Video.mp4..." -ForegroundColor Cyan

Write-Host "1. Running git filter-branch..." -ForegroundColor Yellow
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch 'public/selected-work/dabur lal tail/Video.mp4'" --prune-empty --tag-name-filter cat -- --all

Write-Host "2. Cleaning up Git refs..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .git\refs\original\ -ErrorAction SilentlyContinue

Write-Host "3. Expiring reflog and running garbage collection..." -ForegroundColor Yellow
git reflog expire --expire=now --all
git gc --prune=now --aggressive

Write-Host "Cleanup Complete! You can now run: git push origin main --force" -ForegroundColor Green
