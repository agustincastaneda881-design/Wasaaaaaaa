ls
pwd
ls
git status
cd mi-bot-whatsapp
ls
npm init -y
npm install @whiskeysockets/baileys qrcode-terminal
ls
pwd
cd mi-bot-whatsapp
git init
git add .
git commit -m "bot inicial"
git branch -M main
git remote add origin https://github.com/agustincastaneda881-design/Wasaaaaaaa.git
git push -u origin main -f
cat > .gitignore << 'EOF'
node_modules/
auth_info/
EOF

git rm -r --cached node_modules
git add .
git commit -m "ignorar node_modules"
git push -u origin main -f
rm -rf .git
git init
git add .
git commit -m "bot inicial"
git branch -M main
git remote add origin https://github.com/agustincastaneda881-design/Wasaaaaaaa.git
git push -u origin main -f
