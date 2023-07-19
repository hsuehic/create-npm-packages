import { $ } from 'zx';

export const setPackageJsonField = async (
  fieldName: string,
  value: string | number | boolean
): Promise<void> => {
  await $`npm pkg set ${fieldName}=${value} -ws=false`;
};

export const getPackageJsonField = async (
  fieldName: string
): Promise<string> => {
  const out = await $`npm pkg get ${fieldName} -ws=false`;
  return out.stdout;
};

export const getPackageJsonFields = async (...fieldNames: string[]) => {
  const out = await $`npm pkg get ${fieldNames} -ws=false`;
  return out.stdout;
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
  await $(pieces);
};
