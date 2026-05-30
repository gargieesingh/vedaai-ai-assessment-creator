export function parseResponse<T>(payload: string): T | null {
  try {
    return JSON.parse(payload) as T;
  } catch {
    return null;
  }
}
