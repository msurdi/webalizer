#!/usr/bin/env node
const npm = require("npm");
const path = require("path");

process.chdir(path.join(__dirname, ".."));
npm.load(() => npm.run("start"));
