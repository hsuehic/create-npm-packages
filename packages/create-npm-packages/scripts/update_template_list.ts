import fs from 'node:fs';
import path from 'node:path';

import { TEMPLATES } from '../src/constant.js';
import { __dirname } from '../src/util/global.js';

const templates = `<!--template_list-->
${TEMPLATES.map((v: string) => {
  return `- [${v}](https://github.com/${v})`;
}).join('\n')}
<!--template_list-->
`;

const REG_TEMPLATE_LIST = /<!--template_list-->[\s\S]*<!--template_list-->/gmu;

const READMES = ['../../../README.md', '../README.md'];

const updateTemplateList = (file: string) => {
  const filePath = path.resolve(__dirname, file);
  const originalContent = fs.readFileSync(filePath, 'utf-8');
  const newContent = originalContent.replace(REG_TEMPLATE_LIST, templates);
  fs.writeFileSync(filePath, newContent);
};

export const updateTemplateLists = () => {
  READMES.forEach((file: string) => {
    updateTemplateList(file);
  });
};

updateTemplateLists();
