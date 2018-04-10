import markdownTable from 'markdown-table';
import { IFilesResults } from './common';

export const resultFormatter = (files: IFilesResults): string => {
  let noChange = true;
  const table: Array<(string | number)[]> = [];
  const header = [
    'Ok',
    'File',
    'LinesΔ(%)',
    'BranchesΔ(%)',
    'FunctionsΔ(%)',
    'StatementsΔ(%)'
  ];
  table.push(header);

  Object.keys(files).forEach(file => {
    const { deltas, decreased } = files[file];
    const row = [
      decreased ? '🔴' : '✅',
      file,
      deltas.lines,
      deltas.branches,
      deltas.functions,
      deltas.statements
    ];

    table.push(row);
    noChange = false;
  });

  return noChange ? 'Nothing changed.' : markdownTable(table);
};
