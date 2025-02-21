import { ContentType, type SeoOptions } from "~/types/seo";

export const useMetaTags = (options: SeoOptions) => {
    const baseTags = [
      { name: 'description', content: options.description },
      { name: 'keywords', content: options.keywords?.join(', ') }
    ];
  
    const openGraphTags = [
      { property: 'og:title', content: options.title },
      { property: 'og:description', content: options.description },
      { property: 'og:type', content: options.type },
      { property: 'og:url', content: options.url },
      { property: 'og:image', content: options.image?.url },
      { property: 'og:site_name', content: options.siteName },
      { property: 'og:locale', content: options.locale }
    ];
  
    const twitterTags = [
      { name: 'twitter:card', content: options.twitterCard },
      { name: 'twitter:title', content: options.title },
      { name: 'twitter:description', content: options.description },
      { name: 'twitter:image', content: options.image?.url }
    ];
  
    const articleTags = [
      ...(options.type === ContentType.Article || options.type === ContentType.Blog || options.type === ContentType.News ? [
        { property: 'article:published_time', content: options.publishedTime },
        { property: 'article:modified_time', content: options.modifiedTime },
        { property: 'article:section', content: options.section },
        ...options.articleTags?.map(tag => ({
          property: 'article:tag',
          content: tag
        })) || []
      ] : [])
    ];
  
    const imageTags = options.image ? [
      { property: 'og:image:width', content: options.image.width?.toString() },
      { property: 'og:image:height', content: options.image.height?.toString() },
      { property: 'og:image:alt', content: options.image.alt },
      { property: 'og:image:type', content: options.image.type }
    ] : [];
  
    const analyticsTags = options.analytics ? [
      ...(options.analytics.gaId ? [{ name: 'google-analytics', content: options.analytics.gaId }] : []),
      ...(options.analytics.fbPixelId ? [{ name: 'facebook-domain-verification', content: options.analytics.fbPixelId }] : [])
    ] : [];
  
    return [
      ...baseTags,
      ...openGraphTags,
      ...twitterTags,
      ...articleTags,
      ...imageTags,
      ...analyticsTags
    ].filter(tag => tag.content);
  };