import crypto from "crypto";

const enc = (s) => Buffer.from(s, "utf8").toString("base64url");
const dec = (s) => Buffer.from(s, "base64url").toString("utf8");

export function signDownloadToken({ slug, sid, minutes = 60 }) {
  if (!process.env.DOWNLOAD_SECRET) throw new Error("Missing DOWNLOAD_SECRET");
  const exp = Math.floor(Date.now() / 1000) + minutes * 60;
  // payload: slug.exp.sid  (sid optional for backward-compat)
  const payload = [slug, exp, sid || ""].join(".");
  const sig = crypto
    .createHmac("sha256", process.env.DOWNLOAD_SECRET)
    .update(payload)
    .digest("hex");
  return enc(`${payload}.${sig}`);
}

export function verifyDownloadToken(token) {
  if (!process.env.DOWNLOAD_SECRET) throw new Error("Missing DOWNLOAD_SECRET");
  try {
    const [slug, expStr, sid, sig] = dec(token).split(".");
    const exp = parseInt(expStr, 10);
    const payload = [slug, exp, sid || ""].join(".");
    const expected = crypto
      .createHmac("sha256", process.env.DOWNLOAD_SECRET)
      .update(payload)
      .digest("hex");
    const okSig = crypto.timingSafeEqual(
      Buffer.from(sig),
      Buffer.from(expected)
    );
    const notExpired = exp > Math.floor(Date.now() / 1000);
    return { ok: okSig && notExpired, slug, sid: sid || null, exp };
  } catch {
    return { ok: false, slug: null, sid: null };
  }
}
