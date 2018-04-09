import markdownTable from 'markdown-table';
import { IFilesResults } from './common';

export const resultFormatter = (files: IFilesResults): string => {
  const table: Array<(string | number)[]> = [];
  const header = [
    'File',
    'Lines Δ',
    'Branches Δ',
    'Functions Δ',
    'Statements Δ',
    'Ok'
  ];
  table.push(header);

  Object.keys(files).forEach(file => {
    const { deltas, decreased } = files[file];
    const row = [
      file,
      deltas.lines,
      deltas.branches,
      deltas.functions,
      deltas.statements,
      decreased ? '🔴' : '✅'
    ];

    table.push(row);
  });

  return markdownTable(table);
};
