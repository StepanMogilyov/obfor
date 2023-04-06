const fs = require("fs");
const path = require("path");
const chooseObfuscator = require("./chooseObfuscator");

module.exports = function obfuscateDirectory(dirFrom, nameOfDirFrom, nameOfDirTo) {
  const dirContent = fs.readdirSync(dirFrom);

  for (const element of dirContent) {
    const pathToElem = path.join(dirFrom, element);
    if (fs.lstatSync(pathToElem).isDirectory()) {
      obfuscateDirectory(pathToElem, nameOfDirFrom, nameOfDirTo);
    } else {
      const dirTo = dirFrom.replace(nameOfDirFrom, nameOfDirTo);
      const oldPathToFile = path.join(dirFrom, element);
      chooseObfuscator(oldPathToFile, dirTo, element);
    }
  }
};
