// functionas and variables for managing dependencies for lint
import { exec } from 'cnp-utils';

export const getPackagePeerDependencies = async (
  packageName: string
): Promise<Record<string, string>> => {
  const stdout = await exec`npm view ${packageName} peerDependencies`;
  const dependencies = eval(`(${stdout})`) as unknown as Record<string, string>;
  return dependencies;
};
