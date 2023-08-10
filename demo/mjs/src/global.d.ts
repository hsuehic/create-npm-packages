// #region override https://github.com/microsoft/TypeScript/issues/36146#issuecomment-1190925432
declare global {
  module 'cnp-utils' {
    export * from 'cnp-utils';

    export declare const exec: (
      pieces: TemplateStringsArray,
      ...args: unknown[]
    ) => Promise<string>;
  }
}
//#endregion
