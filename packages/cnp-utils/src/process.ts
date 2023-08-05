export const exec = async (
  piecies: TemplateStringsArray,
  ...args: unknown[]
): Promise<string> => {
  const zx = await import('zx');
  const { $ } = zx;
  $.verbose = false;
  const processOutput = await $(piecies, ...args);
  return processOutput.stdout.replace(/\s+$/m, '');
};
