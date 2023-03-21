const fs = require("fs");
const path = require("path");
const HTML_obfuscator = require("html-obfuscator");
const JS_obfuscator = require("javascript-obfuscator");
const CSS_obfuscator = require("clean-css");

function jsObfuscator(pathToFile, dirTo, fileName) {
  const fileContent = fs.readFileSync(pathToFile, "utf8");
  const result = JS_obfuscator.obfuscate(fileContent, "utf8");
  createNewFile(dirTo, fileName, result._obfuscatedCode);
}

function htmlObfuscator(pathToFile, dirTo, fileName) {
  const result = HTML_obfuscator(pathToFile);
  createNewFile(dirTo, fileName, result);
}

function cssObfuscator(pathToFile, dirTo, fileName) {
  const fileContent = fs.readFileSync(pathToFile, "utf8");
  const result = new CSS_obfuscator().minify(fileContent).styles;
  createNewFile(dirTo, fileName, result);
}

function createNewFile(dirTo, fileName, obfuscatedResult) {
  dirTo = path.join(dirTo, fileName);
  fs.writeFileSync(dirTo, obfuscatedResult);
}

module.exports = { jsObfuscator, htmlObfuscator, cssObfuscator };
