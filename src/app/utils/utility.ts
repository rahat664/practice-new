export function uuid(): string {
  // Browser crypto থাকলে randomUUID, নইলে fallback
  try {
    return (crypto as any).randomUUID();
  } catch {
    return Math.random().toString(36).slice(2);
  }
}

