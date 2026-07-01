# 1. Rename the folder and files on disk
$oldDir = "public\all-work\3D Product Visualization"
$newDir = "public\all-work\3d-product-visualization"

if (Test-Path $oldDir) {
    Rename-Item -Path $oldDir -NewName "3d-product-visualization"
}

$oldFile1 = "$newDir\01 SURBHIKA MARRIGOLD PETALS VIDEO WEBSITE.mp4"
$newFile1 = "01-surbhika-marigold-petals.mp4"
if (Test-Path $oldFile1) {
    Rename-Item -Path $oldFile1 -NewName $newFile1
}

$oldFile2 = "$newDir\02 SUMMERCOOL BIG-B JUMBO COOLER VIDEO_HIGH_RENDER.mp4"
$newFile2 = "02-summercool-big-b-jumbo-cooler.mp4"
if (Test-Path $oldFile2) {
    Rename-Item -Path $oldFile2 -NewName $newFile2
}

# 2. Run git filter-branch with properly quoted path to avoid "bad revision 'Product'"
# Note: We must use the OLD path with spaces because that is how it exists in the git history!
$filterCmd = "git rm --cached --ignore-unmatch 'public/all-work/3D Product Visualization/02 SUMMERCOOL BIG-B JUMBO COOLER VIDEO_HIGH_RENDER.mp4'"
git filter-branch --force --index-filter $filterCmd --prune-empty --tag-name-filter cat -- --all

# 3. Clean up refs
if (Test-Path ".git/refs/original/") {
    Remove-Item -Recurse -Force ".git/refs/original/"
}

# 4. Expire reflog and garbage collect
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 5. Add all changes (including our renames and code updates) and commit
git add .
git commit -m "Rename 3D product assets and clean git history"

# 6. Force push
git push origin main --force
