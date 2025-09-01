export const POST_LIST = `*[_type == "post" && defined(slug.current) && defined(publishedAt)] 
  | order(publishedAt desc) {
  "id": _id,
  "slug": slug.current,
  title,
  excerpt,
  tags,
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
  }
}`;

export const POST_BY_SLUG = `*[_type == "post" && slug.current == $slug][0]{
  "id": _id,
  "slug": slug.current,
  title,
  excerpt,
  tags,
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
