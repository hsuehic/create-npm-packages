export const singleton = <T>(func: () => T): T => {
  const cache = new Map();
  if (cache.get(func)) {
    return cache.get(func) as unknown as T;
  } else {
    const v = func();
    cache.set(func, v);
    return v;
  }
};
