import { createClient } from "@sanity/client";

export function getServerClient() {
  const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: process.env.SANITY_API_VERSION || "2023-10-01",
    useCdn: false,
  };
  const token = process.env.SANITY_READ_TOKEN;
  return token ? createClient({ ...config, token }) : createClient(config);
}
