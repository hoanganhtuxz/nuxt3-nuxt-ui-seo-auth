// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  // css: ["~/assets/css/main.css"],
  app: {
    // seo
    head: {
      htmlAttrs: {
        lang: "vi",
      },
      title: "My Nuxt App",
      titleTemplate: "%s - My Nuxt App",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "My amazing Nuxt application",
        },
        // Open Graph
        { property: "og:site_name", content: "My Nuxt App" },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:title",
          property: "og:title",
          content: "My Nuxt App",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "My amazing Nuxt application",
        },
        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@yourtwitterhandle" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  modules: [
    // Cấu hình robots
    [
      "nuxt-simple-sitemap",
      {
        siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
        generateOnBuild: true,
        robots: true, // Kích hoạt tạo robots.txt
        robotsConfig: {
          UserAgent: "*",
          Allow: "/",
        },
      },
    ], // cấu hình đa ngữ
    [
      "@nuxtjs/i18n",
      {
        baseUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
        locales: [
          { code: "vi", iso: "vi-VN", name: "Tiếng việt", file: "vi.json" },
          { code: "en", iso: "en-US", name: "English", file: "en.json" },
        ],
        defaultLocale: "vi",
        strategy: "prefix", // or 'prefix_and_default'
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: "i18n_redirected",
          alwaysRedirect: true,
          fallbackLocale: "vi",
          redirectOn: "root",
        },
        lazy: true,
        langDir: "locales/",
        // sync: true, or false
        // seo: true, or false
      },
    ], // nuxt ui
    [
      "@nuxt/ui",
      {
        global: true,
      },
    ], // pinia
    "@pinia/nuxt",
    "@nuxt/image",
  ],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
      apiUrl: process.env.NUXT_API_URL || "http://localhost:3000",
    },
  },
  // srcDir: "/",
  typescript: {
    strict: true,
    typeCheck: true,
  },
  nitro: {
    routeRules: {
      "/api/**": { cors: true },
      "/**": { ssr: true },
    },
  },

  // Components auto-import
  components: {
    dirs: ["~/components", "~/components/ui"],
  },
});
