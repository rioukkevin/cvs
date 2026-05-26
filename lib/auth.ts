export const SESSION_COOKIE = "cv_session";
export const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const encoder = new TextEncoder();

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not set");
  }
  return secret;
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function bytesToHex(bytes: ArrayBuffer): string {
  const arr = new Uint8Array(bytes);
  let out = "";
  for (let i = 0; i < arr.length; i++) {
    out += arr[i].toString(16).padStart(2, "0");
  }
  return out;
}

function hexToBytes(hex: string): Uint8Array | null {
  if (hex.length % 2 !== 0) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    const byte = Number.parseInt(hex.substring(i * 2, i * 2 + 2), 16);
    if (Number.isNaN(byte)) return null;
    out[i] = byte;
  }
  return out;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a[i] ^ b[i];
  }
  return mismatch === 0;
}

async function hmac(timestamp: string, secret: string): Promise<string> {
  const key = await importKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(timestamp));
  return bytesToHex(sig);
}

export async function createSession(): Promise<string> {
  const secret = getSecret();
  const timestamp = Date.now().toString();
  const signature = await hmac(timestamp, secret);
  return `${timestamp}.${signature}`;
}

export async function verifySession(
  value: string | undefined,
): Promise<boolean> {
  if (!value) return false;

  const parts = value.split(".");
  if (parts.length !== 2) return false;

  const [timestamp, signature] = parts;
  if (!timestamp || !signature) return false;

  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || ts <= 0) return false;

  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return false;
  }

  const expectedHex = await hmac(timestamp, secret);
  const expectedBytes = hexToBytes(expectedHex);
  const providedBytes = hexToBytes(signature);
  if (!expectedBytes || !providedBytes) return false;
  if (!timingSafeEqual(expectedBytes, providedBytes)) return false;

  return Date.now() - ts < MAX_AGE_SECONDS * 1000;
}
