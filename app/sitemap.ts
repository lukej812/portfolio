import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/work";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  return [
    { url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...caseStudies.map((c) => ({
      url: `${url}/work/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
