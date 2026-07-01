# 1. Permanently delete the local Git repository and all its history (including the 187MB ghost file)
Write-Host "Nuking old git history..."
if (Test-Path ".git") {
    Remove-Item -Recurse -Force ".git"
}

# 2. Initialize a fresh Git repository
Write-Host "Initializing fresh git repository..."
git init

# 3. Reconnect to GitHub
Write-Host "Adding GitHub remote..."
git remote add origin https://github.com/kuldeepsinh18/forward-studio.git

# 4. Stage all current files (including the renamed paths and the 52MB file)
Write-Host "Staging files..."
git add .

# 5. Create the initial commit
Write-Host "Creating fresh commit..."
git commit -m "Initial commit - Fresh clean history with optimized assets"

# 6. Force push to overwrite the old bloated history on GitHub
Write-Host "Force pushing to GitHub..."
git push -u origin main --force

Write-Host "Done! Your repository is now clean and fully synchronized."
