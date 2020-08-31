#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const {
  NPMRC_REGISTRY,
  NPMRC_TOKEN,
  NPMRC_SCOPE,
  NPMRC_FORCE,
  NPMRC_DEBUG,
} = process.env;

if (NPMRC_DEBUG) {
  console.log("gen-npmrc got:", {
    NPMRC_REGISTRY,
    NPMRC_TOKEN,
    NPMRC_SCOPE,
    NPMRC_FORCE,
    NPMRC_DEBUG,
  });
}

let template = `
@${NPMRC_SCOPE}:registry=${NPMRC_REGISTRY}
${NPMRC_REGISTRY.replace("https:", "")}:_authToken=${NPMRC_TOKEN}
`;

const exists = fs.existsSync(".npmrc");
console.log(`.npmrc file ${exists ? "exists" : "not found"}.`);

if (!exists || NPMRC_FORCE) {
  console.log("creating .npmrc file.");
  fs.writeFileSync(path.join(process.cwd(), ".npmrc"), template);
}
console.log("finished.");
