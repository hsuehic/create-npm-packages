import { exec, setPackageJsonField } from 'cnp-utils';

void exec`date`.then(stdout => {
  console.log(stdout);
});

void setPackageJsonField('name', 'test');
