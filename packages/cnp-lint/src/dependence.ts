// functionas and variables for managing dependencies for lint
import { exec } from 'cnp-utils';

import { ESLINT_CONFIG_PACKAGE, STYLELINT_CONFIG_PACKAGE } from './contant.js';

export const getPackagePeerDependencies = async (
  packageName: string
): Promise<Record<string, string>> => {
  const stdout = await exec`npm view ${packageName} peerDependencies`;
  const dependencies = eval(stdout) as unknown as Record<string, string>;
  return dependencies;
};

export const ESLINT_CONFIG_PACKAGE_VERSION =
  await exec`npm view ${ESLINT_CONFIG_PACKAGE} version`;
export const STYLELINT_CONFIG_PACKAGE_VERSION =
  await exec`npm view ${STYLELINT_CONFIG_PACKAGE} version`;
