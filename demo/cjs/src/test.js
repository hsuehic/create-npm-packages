const { exec } = require('cnp-utils');

exec`date`.then(stdout => {
  console.log(stdout);
});
