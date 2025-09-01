import { revalidatePath } from "next/cache";

export async function POST(request) {
  const secret = process.env.REVALIDATE_SECRET;
  const body = await request.json().catch(() => ({}));
  const sent = body?.secret || request.headers.get("x-revalidate-secret");
  if (!secret || sent !== secret) return new Response("Unauthorized", { status: 401 });

  await revalidatePath("/templates");
  await revalidatePath("/templates/[slug]");
  return new Response(JSON.stringify({ revalidated: true }), {
    headers: { "content-type": "application/json" }
  });
}
