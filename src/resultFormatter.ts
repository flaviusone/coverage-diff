import markdownTable from 'markdown-table';
import { getSummaryPercentages } from './helpers';
import { IFilesResults, ITotalResultFormat } from './common';

export const resultFormatter = (
  files: IFilesResults,
  total: ITotalResultFormat
): string => {
  const formattedFiles = formatFilesResults(files);
  const formattedTotal = formatTotal(total);
  return `${formattedFiles}${formattedTotal}`;
};

const formatTotal = (total: ITotalResultFormat): string => {
  const table: Array<(string | number)[]> = [];
  const { lines, branches, functions, statements } = getSummaryPercentages(
    total.totals
  );

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

const formatFilesResults = (files: IFilesResults): string => {
  let noChange = true;
  const table: Array<(string | number)[]> = [];
  const header = [
    'Ok',
    'File',
    'LinesΔ',
    'BranchesΔ',
    'FunctionsΔ',
    'StatementsΔ'
  ];
  table.push(header);

  Object.keys(files).forEach(file => {
    const { deltas, decreased } = files[file];
    const row = [
      decreased ? '🔴' : '✅',
      file,
      formatDelta(deltas.lines),
      formatDelta(deltas.branches),
      formatDelta(deltas.functions),
      formatDelta(deltas.statements)
    ];

    table.push(row);
    noChange = false;
  });

  return noChange ? 'Coverage values did not change👌.' : markdownTable(table);
};

const formatDelta = (num: number): string => {
  return num >= 0 ? `+${num}%` : `${num}%`;
};
