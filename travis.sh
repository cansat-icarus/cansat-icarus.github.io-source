#!/bin/bash
# Almost a copy of https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

set -e # exit with nonzero exit code if anything fails

# Install hexo globally
echo 'Installing hexo-cli'
npm install -g hexo-cli

echo 'Generating the english version'
cd en
hexo generate
cd ..

echo 'Generating the portuguese version'
cd pt
hexo generate
cd ..

# create a shiny *new* Git repo in an output folder
echo 'Setting up the output folder'
mkdir output
cd output
git init

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email "the-mighty-travis-bot@example.org"

# Make sure there is a .nojekyll file here
echo 'Copying files...'
touch .nojekyll
cp -r ../en/public en
cp -r ../pt/public pt
cp ../index.html index.html

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add .
git commit -m "Deploy to GitHub Pages"

# Force push from the current repo's master branch to the remote
# repo's master branch. (All previous history on the master branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force "https://${GH_TOKEN}@${GH_REF}" master > /dev/null 2>&1
