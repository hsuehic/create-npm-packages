import { exec } from './process';

export const setPackageJsonField = async (
  fieldName: string,
  value: string | number | boolean
): Promise<void> => {
  await exec`npm pkg set ${fieldName}=${value} -ws=false`;
};

export const getPackageJsonField = async (
  fieldName: string
): Promise<string> => {
  const out = await exec`npm pkg get ${fieldName} -ws=false`;
  return out;
};

export const getPackageJsonFields = async (...fieldNames: string[]) => {
  const out = await exec`npm pkg get ${fieldNames} -ws=false`;
  return out;
};

export const setPackageJsonFields = async (
  keyValuePairs: { key: string; value: string }[]
): Promise<void> => {
  const command = `npm pkg set ${keyValuePairs
    .map(({ key, value }) => {
      return `${key}='${value}'`;
    })
    .join(' ')}`;
  const pieces: TemplateStringsArray = [
    command,
  ] as unknown as TemplateStringsArray;
  await exec(pieces);
};
