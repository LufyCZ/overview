export const delay = (delay: number) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), delay));

export async function timeoutFetcher<
  T extends Function & ((...args: any) => any)
>(
  functions: T[],
  args: Parameters<T>,
  timeout: number
): Promise<ReturnType<T>> {
  for (const func of functions) {
    try {
      const res = await Promise.race([func(...args), delay(timeout)]);
      if (res !== undefined) return res;
    } catch {}
  }

  throw new Error(
    "None of the provided functions returned successfully in the provided timeframe."
  );
}
