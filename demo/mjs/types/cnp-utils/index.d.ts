export module 'cnp-utils' {
  export interface Downloader {
    (name: string): void;
  }

  export function download<T>(source: T, target: T): Promise<void>;
  export function download1<T>(source: T, target: T): Promise<void>;
  export interface Singleton {
    name: string;
    getInstance<T>(): T;
  }
}
