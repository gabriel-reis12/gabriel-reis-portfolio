declare module 'node:fs' {
  export function existsSync(path: string): boolean;
  export function rmSync(
    path: string,
    options?: { recursive?: boolean; force?: boolean },
  ): void;
}

declare module 'node:path' {
  export function resolve(...paths: string[]): string;
}
