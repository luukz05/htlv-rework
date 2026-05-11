export async function resolvePageData<T extends Record<string, Promise<unknown>>>(promises: T) {
  const entries = await Promise.all(
    Object.entries(promises).map(async ([key, promise]) => [key, await promise]),
  );

  return Object.fromEntries(entries) as {
    [K in keyof T]: Awaited<T[K]>;
  };
}
