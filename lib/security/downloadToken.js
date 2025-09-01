import crypto from "crypto";

const enc = (s) => Buffer.from(s, "utf8").toString("base64url");
const dec = (s) => Buffer.from(s, "base64url").toString("utf8");

export function signDownloadToken({ slug, minutes = 60 }) {
  if (!process.env.DOWNLOAD_SECRET) throw new Error("Missing DOWNLOAD_SECRET");
  const exp = Math.floor(Date.now() / 1000) + Math.floor(minutes * 60);
  const payload = `${slug}.${exp}`;
  const h = crypto.createHmac("sha256", process.env.DOWNLOAD_SECRET).update(payload).digest("hex");
  const token = enc(`${payload}.${h}`);
  return token;
}

export function verifyDownloadToken(token) {
  if (!process.env.DOWNLOAD_SECRET) throw new Error("Missing DOWNLOAD_SECRET");
  try {
    const parts = dec(token).split(".");
    if (parts.length != 3) return { ok: false };
    const [slug, expStr, sig] = parts;
    const exp = parseInt(expStr, 10);
    const payload = `${slug}.${exp}`;
    const expected = crypto.createHmac("sha256", process.env.DOWNLOAD_SECRET).update(payload).digest("hex");
    const okSig = crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    const notExpired = exp > Math.floor(Date.now() / 1000);
    return { ok: okSig && notExpired, slug };
  } catch {
    return { ok: false };
  }
}
