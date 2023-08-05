import { exec } from './process.js';

export const setPackageJsonField = async (
  fieldName: string,
  value: string | number | boolean
): Promise<void> => {
  await exec`npm pkg set ${fieldName}=${value} -ws=false`;
};

export const getPackageJsonField = async (
  fieldName: string
): Promise<string> => {
  const stdout = await exec`npm pkg get ${fieldName} -ws=false`;
  return stdout;
};

export const getPackageJsonFields = async (...fieldNames: string[]) => {
  const stdout = await exec`npm pkg get ${fieldNames} -ws=false`;
  return stdout;
};

export const setPackageJsonFields = async (
  keyValuePairs: { key: string; value: string }[]
): Promise<void> => {
  const command = `npm pkg set ${keyValuePairs
    .map(({ key, value }) => {
      return `${key}='${value}'`;
    })
    .join(' ')} -ws=false`;
  const pieces: TemplateStringsArray = [
    command,
  ] as unknown as TemplateStringsArray;
  await exec(pieces);
};
