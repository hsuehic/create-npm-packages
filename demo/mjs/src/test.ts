import * as path from 'path';

import {
  Singleton,
  download,
  download1,
  exec,
  setPackageJsonField,
} from 'cnp-utils';

void exec`date`.then(stdout => {
  stdout.split('');
});

void setPackageJsonField('name', 'test');

void download(
  'https://github.com/microsoft/TypeScript/archive/refs/tags/v5.1.5.zip',
  path.resolve(__dirname, './main.zip')
);

void download1(2, 3);

const singleton: Singleton<string> = {
  name: 'test',
  getInstance() {
    return this.name;
  },
};
singleton.getInstance<number>();
