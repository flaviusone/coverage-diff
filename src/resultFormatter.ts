import markdownTable from 'markdown-table';
import { FilesResults, FileResultFormat } from './common';
import { defaultOptions } from './index';

export const resultFormatter = (
  files: FilesResults,
  total: FileResultFormat,
  coverageThreshold = defaultOptions.coverageThreshold!,
  coverageDecreaseThreshold = defaultOptions.coverageDecreaseThreshold!,
  newFileCoverageThreshold = coverageThreshold
): string => {
  const formattedFiles = formatFilesResults(
    files,
    coverageThreshold,
    coverageDecreaseThreshold,
    newFileCoverageThreshold
  );
  const formattedTotal = formatTotal(total);
  return `${formattedFiles}${formattedTotal}`;
};

const formatTotal = (total: FileResultFormat): string => {
  const table: Array<(string | number)[]> = [];
  const { lines, branches, functions, statements } = total.pcts;

  const lDelta = formatDelta(total.deltas.lines);
  const bDelta = formatDelta(total.deltas.branches);
  const fDelta = formatDelta(total.deltas.functions);
  const sDelta = formatDelta(total.deltas.statements);

  table.push(['Lines', 'Branches', 'Functions', 'Statements']);
  table.push([
    `${lines}%(${lDelta})`,
    `${branches}%(${bDelta})`,
    `${functions}%(${fDelta})`,
    `${statements}%(${sDelta})`
  ]);

  return '\n\nTotal:\n\n' + markdownTable(table);
};

const formatFilesResults = (
  files: FilesResults,
  coverageThreshold = defaultOptions.coverageThreshold!,
  coverageDecreaseThreshold = defaultOptions.coverageDecreaseThreshold!,
  newFileCoverageThreshold = coverageThreshold
): string => {
  let noChange = true;
  const table: Array<(string | number)[]> = [];
  const header = [
    'Ok (reason)',
    'File',
    'Lines',
    'Branches',
    'Functions',
    'Statements'
  ];
  table.push(header);

  Object.keys(files).forEach((file) => {
    const { deltas, pcts, decreased, belowThreshold, isNewFile } = files[file];
    const reasons = [];
    if (belowThreshold) {
      reasons.push(
        `Below ${isNewFile ? coverageThreshold : newFileCoverageThreshold}%`
      );
    }
    if (decreased) {
      reasons.push(`Decreased >${coverageDecreaseThreshold}%`);
    }

    const row = [
      decreased || belowThreshold ? `🔴<br />(${reasons.join(' & ')})` : '✅',
      `${isNewFile ? '(New) ' : ''}${file}`,
      `${pcts.lines}%<br>(${formatDelta(deltas.lines)})`,
      `${pcts.branches}%<br>(${formatDelta(deltas.branches)})`,
      `${pcts.functions}%<br>(${formatDelta(deltas.functions)})`,
      `${pcts.statements}%<br>(${formatDelta(deltas.statements)})`
    ];

    table.push(row);
    noChange = false;
  });

  return noChange ? 'Coverage values did not change👌.' : markdownTable(table);
};

const formatDelta = (num: number): string => {
  return num >= 0 ? `+${num}%` : `${num}%`;
};
