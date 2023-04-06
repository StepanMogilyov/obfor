const fs = require("fs");
const JS_obfuscator = require("javascript-obfuscator");
const HTML_obfuscator = require("html-obfuscator");
const CSS_obfuscator = require("clean-css");
const createNewFile = require("./createNewFile");

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

module.exports = { jsObfuscator, htmlObfuscator, cssObfuscator };
