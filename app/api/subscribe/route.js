export async function POST(request) {
  const form = await request.formData();
  const email = String(form.get("email") || "").trim();
  if (!email) return new Response("Email required", { status: 400 });
  // TODO: integrate with your ESP (e.g., Resend, Mailchimp, Brevo)
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "content-type": "application/json" }
  });
}
