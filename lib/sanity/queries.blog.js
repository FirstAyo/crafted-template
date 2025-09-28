// queries.blog.js

export const POST_LIST = `*[_type == "post" && defined(slug.current) && defined(publishedAt)]
  | order(publishedAt desc) {
  "id": _id,
  "slug": slug.current,
  title,
  excerpt,
  tags,
  // NEW: series/level/orderIndex for related & Hosting Academy UI
  series,
  level,
  orderIndex,
  // Optional convenience flag (works even if you sometimes use a tag instead of the field)
  "inHostingAcademy": series == "hosting-academy" || "hosting-academy" in tags,

  publishedAt,
  "updatedAt": coalesce(updatedAt, _updatedAt),

  // Cover image (keep your existing field name)
  "coverUrl": mainImage.asset->url,
  "coverLqip": mainImage.asset->metadata.lqip,
  // (optional) dimensions if you ever want intrinsic sizes
  // "coverW": mainImage.asset->metadata.dimensions.width,
  // "coverH": mainImage.asset->metadata.dimensions.height,

  "author": author->{
    name,
    "imageUrl": image.asset->url
  },
  "categories": categories[]->{
    title,
    "slug": slug.current
  }
}`;

export const POST_BY_SLUG = `*[_type == "post" && slug.current == $slug][0]{
  "id": _id,
  "slug": slug.current,
  title,
  excerpt,
  tags,
  // NEW: series/level/orderIndex for Hosting Academy box + related logic
  series,
  level,
  orderIndex,
  "inHostingAcademy": series == "hosting-academy" || "hosting-academy" in tags,

  publishedAt,
  "updatedAt": coalesce(updatedAt, _updatedAt),

  "coverUrl": mainImage.asset->url,
  "coverLqip": mainImage.asset->metadata.lqip,

  "author": author->{
    name,
    "imageUrl": image.asset->url
  },
  "categories": categories[]->{
    title,
    "slug": slug.current
  },

  body
}`;
