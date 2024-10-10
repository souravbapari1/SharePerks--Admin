#!/bin/bash

# Add your commit message here
COMMIT_MESSAGE="Update code"

# Add files to staging
git add .

# Commit changes
git commit -m "$COMMIT_MESSAGE"

# Push changes to GitHub
git push origin main