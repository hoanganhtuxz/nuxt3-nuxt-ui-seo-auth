import { ContentType, type SeoOptions } from "~/types/seo";

export const useArticleSchema = (options: SeoOptions) => {
  if (
    ![ContentType.Article, ContentType.Blog, ContentType.News].includes(
      options.type as ContentType
    )
  ) {
    return undefined;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: options.title,
    description: options.description,
    image: options.image?.url,
    url: options.url,
    datePublished: options.publishedTime,
    dateModified: options.modifiedTime,
    author: options.author
      ? {
          "@type": "Person",
          name: options.author.name,
          url: options.author.url,
          image: options.author.image,
          description: options.author.description,
          sameAs: options.author.socialProfiles?.map((profile) => profile.url),
        }
      : undefined,
    publisher: options.organization
      ? {
          "@type": "Organization",
          name: options.organization.name,
          logo: {
            "@type": "ImageObject",
            url: options.organization.logo,
          },
          description: options.organization.description,
          address: options.organization.address,
          contactPoint: options.organization.contactPoint,
          sameAs: options.organization.sameAs,
        }
      : undefined,
    articleBody: options.article?.articleBody,
    wordCount: options.article?.wordCount,
    articleSection: options.article?.articleSection,
    keywords: options.keywords,
    thumbnailUrl: options.article?.thumbnailUrl,
    isAccessibleForFree: options.article?.isAccessibleForFree ?? true,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": options.url,
    },
  };
};
