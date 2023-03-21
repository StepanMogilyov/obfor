const path = require("path");
const {
  jsObfuscator,
  htmlObfuscator,
  cssObfuscator,
} = require("./obfuscators");

const input = process.argv;
const dirFrom = process.env.INIT_CWD;
const isDirTo = input[input.length - 1].includes("*folder=");

let dirTo = ".";
if (isDirTo) {
  dirTo = input.pop().split("=")[1];
}

for (let i = 2; i < input.length; i++) {
  const fileName = input[i];
  chooseCommand(fileName);
}

function chooseCommand(fileName) {
  const pathToFile = path.join(dirFrom, fileName);
  const ext = fileName.split(".")[1];
  if (ext === "js") {
    jsObfuscator(pathToFile, dirTo, fileName);
  } else if (ext === "html") {
    htmlObfuscator(pathToFile, dirTo, fileName);
  } else if (ext === "css") {
    cssObfuscator(pathToFile, dirTo, fileName);
  }
}
