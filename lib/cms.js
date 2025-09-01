import { sanityClient } from "./sanity/client";
import { TEMPLATE_LIST, TEMPLATE_BY_SLUG } from "./sanity/queries";
import { templates as localTemplates } from "./templates";

const hasSanity = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export async function getTemplates() {
  if (!hasSanity) return localTemplates;
  try {
    const data = await sanityClient.fetch(TEMPLATE_LIST);
    if (!Array.isArray(data) || data.length === 0) return localTemplates;
    return data;
  } catch (e) {
    console.warn("Sanity fetch failed, falling back to local data:", e?.message || e);
    return localTemplates;
  }
}

export async function getTemplateBySlug(slug) {
  if (!hasSanity) return localTemplates.find(t => t.slug === slug);
  try {
    const data = await sanityClient.fetch(TEMPLATE_BY_SLUG, { slug });
    return data || localTemplates.find(t => t.slug === slug);
  } catch (e) {
    console.warn("Sanity fetch failed, falling back to local data:", e?.message || e);
    return localTemplates.find(t => t.slug === slug);
  }
}
