#!/usr/bin/env node
const path = require("path");
const execa = require("execa");

process.chdir(path.join(__dirname, ".."));

execa("npm start", { shell: true }).catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
