export default {
  name: "template",
  title: "Template",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    { name: "excerpt", title: "Excerpt", type: "text", rows: 3 },
    { name: "body", title: "Description", type: "blockContent" },

    {
      name: "category",
      title: "Category",
      type: "string",
      options: { list: ["portfolio", "business", "student", "saas"] },
    },
    {
      name: "tech",
      title: "Tech",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: { list: ["beginner", "intermediate", "advanced"] },
    },
    { name: "priceUSD", title: "Price (USD)", type: "number" },
    { name: "free", title: "Free", type: "boolean" },
    { name: "rating", title: "Rating", type: "number" },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    { name: "updatedAt", title: "Updated at", type: "datetime" },
    { name: "demoUrl", title: "Live Demo URL", type: "url" },
    // { name: "lsVariantId", title: "Lemon Squeezy Variant ID", type: "string" },
    {
      name: "stripePriceId",
      title: "Stripe Price ID",
      type: "string",
      validation: (Rule) =>
        Rule.custom((v) =>
          !v || String(v).startsWith("price_") ? true : "Must start with price_"
        ),
    },
    { name: "downloadFile", title: "Download (zip)", type: "file" },
  ],
};
