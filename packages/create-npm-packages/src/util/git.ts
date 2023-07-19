import fs from 'fs';

import { Octokit } from '@octokit/rest';
import { GetResponseDataTypeFromEndpointMethod } from '@octokit/types';
import decompress from 'decompress';
import { $ } from 'zx';

import { download } from './download.js';

const octokit = new Octokit();

// export type RepoInfo = Awaited<
//   ReturnType<typeof octokit.rest.repos.get>
// >['data'];

export type RepoInfo = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.repos.get
>;

export type ReleaseInfo = GetResponseDataTypeFromEndpointMethod<
  typeof octokit.repos.getLatestRelease
>;

export const getGithubRepoInfo = async (
  owner: string,
  repo: string
): Promise<RepoInfo> => {
  const res = await octokit.repos.get({
    owner,
    repo,
  });
  return res.data;
};

export const getLatestReleaseInfo = async (
  owner: string,
  repo: string
): Promise<ReleaseInfo> => {
  const res = await octokit.repos.getLatestRelease({
    owner,
    repo,
  });
  return res.data;
};

export const downloadLatestReleaseZipArchive = async (
  owner: string,
  repo: string,
  destination: string
): Promise<void> => {
  const latestArchiveInfo = await getLatestReleaseInfo(owner, repo);
  const url = latestArchiveInfo.zipball_url;
  if (url !== null) {
    await download(url, destination);
  } else {
    throw 'No archive available';
  }
};

export const downloadArchiveToDirectory = async (
  owner: string,
  repo: string,
  dir: string
) => {
  const url = `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`;

  const tmp = `${new Date().getTime()}.zip`;
  await download(url, tmp);
  const files = await decompress(tmp, './');
  const pathname = files[0].path;
  const dirname = pathname.substring(0, pathname.indexOf('/'));
  fs.renameSync(dirname, dir);
  fs.unlinkSync(tmp);

  // await $`mv ./${dirname} ./${dir}`;
  // await $`rm -f ${tmp}`;
};

export const getUserInfo = async (): Promise<{
  name: string;
  email: string;
  url: string;
}> => {
  const name = (await $`git config user.name`).stdout.trimEnd();
  const email = (await $`git config user.email`).stdout.trimEnd();
  const url = (await $`git config user.url`).stdout.trimEnd();

  return {
    name,
    email,
    url,
  };
};
