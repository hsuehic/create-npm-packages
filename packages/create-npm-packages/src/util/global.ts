import * as url from 'node:url';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
