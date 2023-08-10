import * as path from 'path';

import { download, exec, setPackageJsonField } from 'cnp-utils';

void exec`date`.then(stdout => {
  stdout.split('');
});

void setPackageJsonField('name', 'test');

void download(
  'https://github.com/microsoft/TypeScript/archive/refs/tags/v5.1.5.zip',
  path.resolve(__dirname, './main.zip')
);
