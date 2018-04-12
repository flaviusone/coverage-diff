/* eslint-disable no-console */

const fs = require('fs');
const coverageDiff = require('../lib/');

const base = JSON.parse(fs.readFileSync('./base-summary.json'));
const head = JSON.parse(fs.readFileSync('./head-summary.json'));
const diff = coverageDiff.diff(base, head);

console.log(diff.diff);
console.log(diff.results);
console.log(diff.regression);
