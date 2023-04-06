const copyFile = require("./copyFile");
const { jsObfuscator, htmlObfuscator, cssObfuscator } = require("./obfuscators");

module.exports = function chooseObfuscator(pathToFile, dirTo, fileName) {
  const indexOfLastDot = fileName.lastIndexOf(".");
  const ext = fileName.substring(indexOfLastDot + 1, fileName.length);

  if (ext === "js") {
    jsObfuscator(pathToFile, dirTo, fileName);
  } else if (ext === "html") {
    htmlObfuscator(pathToFile, dirTo, fileName);
  } else if (ext === "css") {
    cssObfuscator(pathToFile, dirTo, fileName);
  } else {
    copyFile(pathToFile, dirTo, fileName);
  }
};
