/* eslint-disable no-console */

const fs = require('fs');
const { coverageDiff } = require('../lib/coverageDiff');

const base = JSON.parse(fs.readFileSync('./base-summary.json'));
const head = JSON.parse(fs.readFileSync('./head-summary.json'));
const diff = coverageDiff(base, head);

console.log(diff);
