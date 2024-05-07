import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import { marked } from 'marked';
import path from 'path';

type copyRow = {
  key: string;
  text: string;
};

export const copy = async () => {
  const file = readFileSync(
    path.join(process.cwd(), 'src/assets/copy.csv')
  ).toString('utf-8');
  const records = parse(file, {
    columns: true,
    skip_empty_lines: true,
    bom: true
  });

  const copy: Record<string, string> = {};

  records.forEach((r: copyRow) => {
    copy[r.key] = !!r['is-markdown'] ? marked.parse(r.text) : r.text;
  });

  return copy;
};

type linkRow = {
  key: string;
  url: string;
};

export const links = async () => {
  const file = readFileSync(
    path.join(process.cwd(), 'src/assets/links.csv')
  ).toString('utf-8');
  const records = parse(file, {
    columns: true,
    skip_empty_lines: true,
    bom: true
  });

  const links: Record<string, string> = {};

  records.forEach((r: linkRow) => {
    links[r.key] = r.url;
  });

  return links;
};
