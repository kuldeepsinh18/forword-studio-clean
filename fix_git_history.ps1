# Reset Git history to match GitHub, but keep all current files staged
git reset --soft origin/main

# Create a single clean commit with the current state (52MB file)
git commit -m "add 3d product visualization and optimizations"

# Push to GitHub
git push origin main
