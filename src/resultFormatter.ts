import markdownTable from 'markdown-table';
import { getSummaryPercentages } from './helpers';
import { IFilesResults, ICoverageSummary } from './common';

export const resultFormatter = (
  files: IFilesResults,
  total: ICoverageSummary
): string => {
  const formattedFiles = formatFilesResults(files);
  const formattedTotal = formatTotal(total);
  return `${formattedFiles}${formattedTotal}`;
};

const formatTotal = (total: ICoverageSummary): string => {
  const table: Array<(string | number)[]> = [];
  const { lines, branches, functions, statements } = getSummaryPercentages(
    total
  );
  table.push(['Lines', 'Branches', 'Functions', 'Statements']);
  table.push([`${lines}%`, `${branches}%`, `${functions}%`, `${statements}%`]);

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
