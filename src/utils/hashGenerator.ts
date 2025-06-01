import crypto from "node:crypto";

export function generateHash(username: string): string {
  const timestamp = new Date().toISOString();
  const data = `${username}-${timestamp}`;
  return crypto.createHash("md5").update(data).digest("hex").substring(0, 10);
}
