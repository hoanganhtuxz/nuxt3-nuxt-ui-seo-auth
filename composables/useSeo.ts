import { ContentType, TwitterCardType, type SeoOptions } from "~/types/seo";
import { useMetaTags } from "./seo/meta/useMetaTags";
import { useArticleSchema } from "./seo/schema/useArticleSchema";
import { useBreadcrumbSchema } from "./seo/schema/useBreadcrumbSchema";
import { useI18n } from '#i18n'

export function useSeo(options: SeoOptions) {
  const urlUtils = useUrlUtils();
  const { locale } = useI18n();
  const validateSeoOptions = (opts: SeoOptions) => {
    if (!opts.title || !opts.description) {
      throw new Error('Title and description are required for SEO');
    }
  };

  const getDefaultOptions = (config: any, route: any): Partial<SeoOptions> => ({
    type: ContentType.Website,
    image: {
      url: '/default-og-image.jpg'
    },
    url:urlUtils.getFullUrl(),
    twitterCard: TwitterCardType.SummaryLargeImage,
    locale: locale.value || 'vi',
    siteName: config.public?.siteName || 'My Website',
    organization: {
      name: config.public?.orgName || 'My Organization', // đổi tên theo dự án
      logo: config.public?.orgLogo || '/logo.png', // thay path logo
      url: config.public?.orgUrl || 'https://example.com', // thay địa chỉ url
      description: config.public?.orgDescription,
      address: config.public?.orgAddress,
      contactPoint: config.public?.orgContactPoint,
      sameAs: config.public?.orgSocialLinks
    }
  });

  try {
    validateSeoOptions(options);

    const config = useRuntimeConfig();
    const route = useRoute();
    const seoOptions = { ...getDefaultOptions(config, route), ...options };

    const metaTags = useMetaTags(seoOptions);
    const articleSchema = useArticleSchema(seoOptions);
    const breadcrumbSchema = useBreadcrumbSchema(seoOptions.breadcrumb);

    useHead({
      title: seoOptions.title,
      meta: metaTags,
      link: [
        ...(seoOptions.canonicalUrl ? [{
          rel: 'canonical',
          href: seoOptions.canonicalUrl
        }] : []),
        ...(seoOptions.alternateLocales?.map(locale => ({
          rel: 'alternate',
          hreflang: locale,
          href: `${seoOptions.url}?lang=${locale}`
        })) || [])
      ],
      script: [
        ...(articleSchema ? [{
          type: 'application/ld+json',
          children: JSON.stringify(articleSchema)
        }] : []),
        ...(breadcrumbSchema ? [{
          type: 'application/ld+json',
          children: JSON.stringify(breadcrumbSchema)
        }] : [])
      ]
    });
  } catch (error) {
    console.error('SEO Error:', error);
    // Fallback to basic SEO if needed
    useHead({
      title: options.title,
      meta: [
        { name: 'description', content: options.description }
      ]
    });
  }
}