declare module 'cnp-utils' {
  export declare const exec: (
    pieces: TemplateStringsArray,
    ...args: unknown[]
  ) => Promise<string>;
}
