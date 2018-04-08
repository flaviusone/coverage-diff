import markdownTable from 'markdown-table';

export const resultFormatter = (files): string => {
  const table = [];
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
