const path = require("path");
const chooseObfuscator = require("./chooseObfuscator");
const obfuscateDirectory = require("./obfuscateDirectory");
const supportedExtensions = ["js", "html", "css"];

module.exports = function execInputCommand(nameOfLaunchDir, nameOfDirFrom, nameOfDirTo, input) {
  const pathToEntryDir = path.join("../", nameOfLaunchDir);

  try {
    if (input[2] === "--all") {
      obfuscateDirectory(pathToEntryDir, nameOfDirFrom, nameOfDirTo);
    } else {
      for (let i = 2; i < input.length; i++) {
        const fileName = input[i];
        const indexOfLastDot = fileName.lastIndexOf(".");
        const ext = fileName.substring(indexOfLastDot + 1, fileName.length);
        if (supportedExtensions.includes(ext)) {
          const pathToFile = path.join("../", nameOfLaunchDir, fileName);
          const pathToNewDir = path.join("../", nameOfDirTo);
          chooseObfuscator(pathToFile, pathToNewDir, fileName);
        } else {
          throw Error(`---> extension "${ext}" is not supported`.red);
        }
      }
    }
  } catch (err) {
    console.log("Obfuscation error --->".red, err);
    return;
  }
  console.log("Completed".yellow);
};
