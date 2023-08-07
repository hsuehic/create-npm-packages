/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PathLike, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';

// @ts-ignore cjs
import { OptionsInit } from 'got'; // https://github.com/microsoft/TypeScript/issues/51862#issuecomment-1358049778

export const download = async (
  url: string,
  targetFile: PathLike,
  options?: OptionsInit
) => {
  const { got } = await import('got');
  const streamSource = got.stream(url, { ...options, isStream: true });
  const streamTarget = createWriteStream(targetFile);
  await pipeline(streamSource, streamTarget);
};
