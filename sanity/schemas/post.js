export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: Rule => Rule.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: Rule => Rule.required() },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 3 },
    { name: "mainImage", title: "Main Image", type: "image", options: { hotspot: true } },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: Rule => Rule.required()
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }]
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" }
    },
    { name: "publishedAt", title: "Published at", type: "datetime", validation: Rule => Rule.required() },
    { name: "updatedAt", title: "Updated at", type: "datetime" },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } }
      ]
    },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false }
  ]
};
