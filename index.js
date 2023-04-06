#!/usr/bin/env node
const readline = require("readline");
const colour = require("colour");
const path = require("path");
const execInputCommand = require("./src/execInputCommand");

const input = process.argv;
const dirFrom = process.env.INIT_CWD;
const isDirTo = input[input.length - 1].includes("*dir=");

let dirTo = "";

const nameOfDirFrom = path.basename(dirFrom);

if (isDirTo) {
  const dir = input.pop().split("=")[1];
  dir === "." ? (dirTo = nameOfDirFrom) : (dirTo = dir);
} else {
  throw Error("---> Please specify a directory for obfuscated files".red);
}

const nameOfDirTo = path.basename(dirTo);
const nameOfLaunchDir = path.basename(dirFrom);

console.log("Start obfuscation...".yellow);
if (dirTo === nameOfDirFrom) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question("You are going to overwrite the original files. Continue? (y/n) ", (answer) => {
    if (answer.toLowerCase() === "y") {
      execInputCommand(nameOfLaunchDir, nameOfDirFrom, nameOfDirTo, input);
    } else {
      console.log("Operation canceled".yellow);
    }
    rl.close();
  });
} else {
  execInputCommand(nameOfLaunchDir, nameOfDirFrom, nameOfDirTo, input);
}
