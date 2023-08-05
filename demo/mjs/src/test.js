import { exec } from 'cnp-utils';

exec`date`.then(stdout => {
  console.log(stdout);
});
