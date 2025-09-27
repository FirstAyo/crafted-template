import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import schemas from "./schemas";

export default defineConfig({
  name: "craftedtemplate",
  title: "CraftedTemplate CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [deskTool(), structureTool(), visionTool(), codeInput()],
  schema: { types: schemas },
});
