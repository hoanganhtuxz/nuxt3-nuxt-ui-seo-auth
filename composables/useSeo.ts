interface SeoOptions {
  title: string;
  description: string;
  image?: string;
  url?: string;
}
const config = useRuntimeConfig();

export function useSeo(options: SeoOptions) {
  const defaults = {
    image: "/default-og-image.jpg",
    url: config.public?.siteUrl || "http://localhost:3000",
  };

  const seoOptions = { ...defaults, ...options };

  useHead({
    title: seoOptions.title,
    meta: [
      {
        hid: "description",
        name: "description",
        content: seoOptions.description,
      },
      {
        hid: "og:title",
        property: "og:title",
        content: seoOptions.title,
      },
      {
        hid: "og:description",
        property: "og:description",
        content: seoOptions.description,
      },
      {
        hid: "og:image",
        property: "og:image",
        content: seoOptions.image,
      },
      {
        hid: "og:url",
        property: "og:url",
        content: seoOptions.url as any,
      },
    ],
  });
}
