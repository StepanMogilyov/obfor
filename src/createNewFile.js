const fs = require("fs");
const path = require("path");
const rootDir = path.basename(__dirname);

module.exports = function createNewFile(dirTo, fileName, obfuscatedResult) {
  const newPath = path.join(rootDir, dirTo, fileName);
  if (!fs.existsSync(dirTo)) {
    fs.mkdirSync(dirTo, { recursive: true });
  }
  dirTo = path.join(dirTo, fileName); // dir and file

  fs.writeFileSync(dirTo, obfuscatedResult);
  console.log(`${fileName} obfuscated successfully!`.green, `Path is: ${newPath}`);
};
