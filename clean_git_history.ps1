# 1. Remove the file completely from all git history using git filter-branch
# We use --index-filter with git rm --cached which rewrites the history but leaves the actual file on your disk untouched.
$filePath = "public/all-work/3D Product Visualization/02 SUMMERCOOL BIG-B JUMBO COOLER VIDEO_HIGH_RENDER.mp4"
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch `"$filePath`"" --prune-empty --tag-name-filter cat -- --all

# 2. Clean up original refs left by filter-branch
if (Test-Path ".git/refs/original/") {
    Remove-Item -Recurse -Force ".git/refs/original/"
}

# 3. Expire reflog and run garbage collection to permanently delete the 187MB blob from local .git folder
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 4. The 52MB compressed file is still on your disk (because we only removed it from git's index history).
# Now we add the current 52MB file back to tracking and commit it.
git add "`"$filePath`""
git commit -m "Restore 52MB compressed video version"

# 5. Force push the cleaned history to GitHub
git push origin main --force
