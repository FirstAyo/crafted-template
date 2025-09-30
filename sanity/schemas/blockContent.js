// sanity/schemas/blockContent.js
export default {
  name: "blockContent",
  title: "Description",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            title: "URL",
            type: "object",
            fields: [
              { name: "href", type: "url", title: "Link" },
              { name: "blank", type: "boolean", title: "Open in new tab?" },
            ],
          },
        ],
      },
    },
    { type: "image", options: { hotspot: true } },
    { type: "code", title: "Code block" },
    { type: "youtube" }, // reference to the youtube object schema
  ],
};
