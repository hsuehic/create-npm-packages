import { exec } from 'cnp-utils';

void exec`date`.then(stdout => {
  console.log(stdout);
});
