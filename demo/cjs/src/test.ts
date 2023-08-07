import path from 'path';

import { download, exec } from 'cnp-utils';

void exec`date`.then(stdout => {
  console.log(stdout);
});

void download(
  'https://github.com/microsoft/TypeScript/archive/refs/tags/v5.1.5.zip',
  path.resolve(__dirname, './main.zip')
);
