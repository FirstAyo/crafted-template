import crypto from "crypto";

export const runtime = "nodejs";

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload, "utf8");
  const digest = hmac.digest("hex");
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
  } catch { return false; }
}

export async function POST(request) {
  const secret = process.env.LS_WEBHOOK_SECRET;
  if (!secret) return new Response("No LS_WEBHOOK_SECRET", { status: 400 });

  const raw = await request.text();
  const sig = request.headers.get("x-signature");
  if (!sig || !verifySignature(raw, sig, secret)) {
    return new Response("Invalid signature", { status: 401 });
  }

  let event;
  try { event = JSON.parse(raw); } catch { return new Response("Invalid JSON", { status: 400 }); }

  const type = event?.meta?.event_name || "";
  switch (type) {
    case "order_created":
      // TODO: fulfill order - e.g., email a download link
      break;
    default:
      break;
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "content-type": "application/json" }
  });
}
