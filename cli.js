#!/usr/bin/env node

'use strict';

const fs = require('fs');
const { resolve } = require('path');
const coverageDiff = require('coverage-diff');
const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'base', alias: 'b', type: String },
  { name: 'head', alias: 'h', type: String },
  { name: 'minimum', alias: 'm', type: Number, defaultOption: 0 },
  { name: 'decreaseThreshold', alias: 'd', type: Number, defaultOption: 100 },
  { name: 'criteria', alias: 'c', type: String, multiple: true },
  { name: 'totals', alias: 't', type: Boolean },
  { name: 'output', alias: 'o', type: String, multiple: true }
];

const options = commandLineArgs(optionDefinitions);

let hasError = false;
if (!options.base) {
  console.log('Error: Missing argument: base');
  hasError = true;
}

if (!options.head) {
  console.log('Error: Missing argument: head');
  hasError = true;
}

if (hasError) {
  process.exit(1);
}

const base = JSON.parse(fs.readFileSync(resolve(options.base)));
const head = JSON.parse(fs.readFileSync(resolve(options.head)));

const diff = coverageDiff.diff(base, head, {
  coverageDecreaseThreshold: options.decreaseThreshold,
  coverageThreshold: options.minimum,
  checkCriteria: options.criteria.length
    ? options.criteria
    : coverageDiff.defaultOptions.checkCriteria,
  totalsOnly: options.totals
});

for (const output of options.output || []) {
  console.log(diff[output]);
}

if (diff.regression) {
  console.log('\nFailed regression test\n');
  process.exit(1);
}
