#!/usr/bin/env node
const path = require("path");
const execa = require("execa");

process.chdir(path.join(__dirname, ".."));

const command = execa("npm start", { shell: true });
command.stderr.pipe(process.stderr);
command.srdout.pipe(process.stdout);
command.catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
