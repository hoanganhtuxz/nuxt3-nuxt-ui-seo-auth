// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  // css: ["~/assets/css/main.css"],
  app: {
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
      "@nuxtjs/robots",
      {
        UserAgent: "*",
        Allow: "/",
        Sitemap: (ctx: { defaultSiteUrl: string }) =>
          `${ctx.defaultSiteUrl}/sitemap.xml`,
      },
    ],
    [
      "nuxt-simple-sitemap",
      {
        siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
        generateOnBuild: true,
      },
    ],
    [
      "@nuxtjs/i18n",
      {
        baseUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
        locales: [
          { code: "vi", iso: "vi-VN", name: "VN", file: "vi.json" },
          { code: "en", iso: "en-US", name: "EN", file: "en.json" },
        ],
        defaultLocale: "vi",
        strategy: "prefix",
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: "i18n_redirected",
          alwaysRedirect: true,
          fallbackLocale: "vi",
        },
        lazy: true,
        langDir: "locales/",
        sync: false,
      },
    ],
    
    "@nuxtjs/tailwindcss", // tailwind css
   
  ],

  tailwindcss: {
    cssPath: ['~/assets/css/main.css', { injectPosition: "first" }],
    viewer: true,
    exposeConfig: false,
    config: {
      content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  },
  // srcDir: "/",
  typescript: {
    strict: true,
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        moduleResolution: "Bundler",
        target: "ESNext",
        module: "ESNext",
      },
    },
  },
  nitro: {
    routeRules: {
      "/api/**": { cors: true },
      "/**": { ssr: true },
    },
  },

  // Components auto-import
  components: {
    dirs: [
      "~/components",
      // '~/components/blogs'
    ],
  },
});
