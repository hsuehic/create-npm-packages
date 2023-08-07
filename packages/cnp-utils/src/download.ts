/* eslint-disable @typescript-eslint/ban-ts-comment */
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';

// @ts-ignore cjs
import { OptionsInit } from 'got'; // https://github.com/microsoft/TypeScript/issues/51862#issuecomment-1358049778

export const download = async (
  url: string,
  savePath: string,
  options?: OptionsInit
) => {
  const { got } = await import('got');
  const streamSource = got.stream(url, { ...options, isStream: true });
  const streamTarget = fs.createWriteStream(savePath);
  await pipeline(streamSource, streamTarget);
};
