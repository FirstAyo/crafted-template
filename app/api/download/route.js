import { getServerClient } from "../../../lib/sanity/serverClient";
import { verifyDownloadToken } from "../../../lib/security/downloadToken";

export const runtime = "nodejs";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  if (!token) return new Response("Missing token", { status: 400 });

  const v = verifyDownloadToken(token);
  if (!v.ok) return new Response("Invalid or expired token", { status: 401 });

  const client = getServerClient();
  const doc = await client.fetch(
    `*[_type=="template" && slug.current==$slug][0]{title, "fileUrl": downloadFile.asset->url}`,
    { slug: v.slug }
  );
  if (!doc?.fileUrl) return new Response("File not found", { status: 404 });

  return Response.redirect(doc.fileUrl, 302);
}
