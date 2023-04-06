const fsExtra = require("fs-extra");
const path = require("path");

module.exports = function copyFile(pathToFile, dirTo, fileName) {
  const fullPath = path.join(dirTo, fileName);
  if (pathToFile !== fullPath) {
    const newPathToFile = path.join(dirTo, fileName);
    fsExtra.copySync(pathToFile, newPathToFile);
  }
};
