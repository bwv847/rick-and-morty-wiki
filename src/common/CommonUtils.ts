import { NullOrUndefined } from './CommonTypes';

export const APP_TITLE = 'Rick and Morty';

export const IS_SERVER = typeof window === 'undefined';

export function isOfType<T>(obj: any, keys: (keyof T)[]): obj is T {
  for (const key of keys) {
    if (!(key in obj)) {
      return false;
    }
  }
  return true;
}

export const isNullOrUndefined = (val: unknown): val is NullOrUndefined => {
  return val === null || val === undefined;
};
