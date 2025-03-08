export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  const timeoutPromise = new Promise<T>((_, reject) =>
    setTimeout(() => reject(new Error("Timeout excedido")), timeoutMs)
  );

  return Promise.race([promise, timeoutPromise]);
}
