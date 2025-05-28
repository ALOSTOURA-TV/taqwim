const fs = require('fs');
const path = require('path');

const loginFilePath = path.join(__dirname, '../../app/logIn.json');
const newUserFile = path.join(__dirname, '../../newUser.json');

const loginData = JSON.parse(fs.readFileSync(loginFilePath, 'utf-8'));
const newUser = JSON.parse(fs.readFileSync(newUserFile, 'utf-8'));

newUser.id = (parseInt(loginData.at(-1)?.id || '0') + 1).toString();
loginData.push(newUser);

fs.writeFileSync(loginFilePath, JSON.stringify(loginData, null, 2));
