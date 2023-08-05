import { exec } from '../src/process.js';

test('exec', async () => {
  const stdout = await exec`npm --version`;
  // console.log(stdout);
  expect(stdout).toBe('9.5.1');
});
