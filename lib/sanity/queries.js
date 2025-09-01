export const TEMPLATE_LIST = `*[_type == "template"] | order(coalesce(updatedAt, _updatedAt) desc) {
  "id": _id,
  "slug": slug.current,
  title, excerpt, category, tech, difficulty, priceUSD, free, rating, tags, demoUrl,
  "image": image.asset->url,
  "updatedAt": coalesce(updatedAt, _updatedAt),
  "imageUrl": image.asset->url,
  "screens": screenshots[]{ "url": asset->url, "lqip": asset->metadata.lqip },
  "lqip": image.asset->metadata.lqip,
  stripePriceId
}`;

export const TEMPLATE_BY_SLUG = `*[_type == "template" && slug.current == $slug][0]{
  "id": _id,
  "slug": slug.current,
  title, excerpt, category, tech, difficulty, priceUSD, free, rating, tags, demoUrl,
  "image": image.asset->url,
  "imageUrl": image.asset->url,
  "screens": screenshots[]{ "url": asset->url, "lqip": asset->metadata.lqip },
  "lqip": image.asset->metadata.lqip,
  "updatedAt": coalesce(updatedAt, _updatedAt),
  stripePriceId,
  "fileUrl": downloadFile.asset->url
}`;
