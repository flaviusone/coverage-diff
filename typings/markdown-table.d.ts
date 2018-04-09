declare module 'markdown-table' {
  export default function markdownTable(
    table: Array<(string | number)[]>
  ): string;
}
