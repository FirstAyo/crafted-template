import { defineType, defineField } from "sanity";

export default defineType({
  name: "youtube",
  title: "YouTube Video",
  type: "object",
  fields: [
    defineField({
      name: "url",
      title: "YouTube URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "title",
      title: "Accessible title",
      type: "string",
      description: "Used for screen readers and the iframe title.",
    }),
    defineField({
      name: "start",
      title: "Start time (seconds)",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
    }),
  ],
  preview: {
    select: { url: "url", title: "title" },
    prepare({ url, title }) {
      return { title: title || "YouTube", subtitle: url };
    },
  },
});
