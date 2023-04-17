declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    export interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      API_URL: string;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NullOrUndefined = null | undefined;

export type KeyOf<T> = T extends NullOrUndefined ? never : keyof T;

export type EmptyObject = Record<never, unknown>;
