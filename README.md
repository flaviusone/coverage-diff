# coverage-diff

## What it does

- Accepts base-summary.json and head-summary.json
- Diffs the two jsons and outputs info about
  - Percentage of changed coverage (in changed/added files)
  - Formatted as markdown table
- Fail if coverage decreases on a file (check on percentage) for any of the lines/func/statements/branches. Can
   be configured to only check some criteria.
- Separate threshold for new files `newFileCoverageThreshold`, defaults to `coverageThreshold` if not passed
- Written in Typescript.

## Usage

```js
import fs from 'fs';
import { diff as coverageDiff } from 'coverage-diff';

const base = JSON.parse(fs.readFileSync('./base-summary.json'));
const head = JSON.parse(fs.readFileSync('./head-summary.json'));
const diff = coverageDiff.diff(base, head);

console.log(diff.diff);
console.log(diff.results);
console.log(diff.regression);
```

Out:

| Ok  | File  | Lines         | Branches      | Functions    | Statements    |
| --- | ----- | ------------- | ------------- | ------------ | ------------- |
| 🔴  | file1 | 80%<br>(+10%) | 14%<br>(-30%) | 3%<br>(+20%) | 20%<br>(-10%) |
| ✅  | file2 | 20%<br>(+10%) | 8%<br>(-30%)  | 2%<br>(-20%) | 5%<br>(-10%)  |

API at https://flaviusone.github.io/coverage-diff/
