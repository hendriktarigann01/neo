import { MetadataRoute } from "next";

const baseUrl = "https://neodisplay.id";
const locales = ["en", "id"];
const routes = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  const result: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      result.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      });
    });
  });

  return result;
}
