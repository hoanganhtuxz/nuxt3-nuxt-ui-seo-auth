export enum ContentType {
    Website = 'website',
    Article = 'article',
    Blog = 'blog',
    News = 'news',
    Product = 'product'
  }
  
  export enum TwitterCardType {
    Summary = 'summary',
    SummaryLargeImage = 'summary_large_image',
    App = 'app',
    Player = 'player'
  }
  
  export interface ImageMeta {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
    type?: string;
  }
  
  export interface SocialProfile {
    platform: 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram';
    url: string;
    username?: string;
  }
  
  export interface Author {
    name: string;
    url?: string;
    image?: string;
    description?: string;
    socialProfiles?: SocialProfile[];
  }
  
  export interface Organization {
    name: string;
    logo?: string;
    url?: string;
    description?: string;
    address?: string;
    contactPoint?: {
      type: string;
      telephone: string;
      email: string;
      contactType: string;
    };
    sameAs?: string[];
  }
  
  export interface ArticleData {
    wordCount?: number;
    articleBody?: string;
    thumbnailUrl?: string;
    articleSection?: string;
    tags?: string[];
    category?: string;
    dependencies?: string[];
    isAccessibleForFree?: boolean;
  }
  
  export interface BreadcrumbItem {
    name: string;
    url: string;
  }
  
  export interface SeoOptions {
    title: string;
    description: string;
    image?: ImageMeta;
    url?: string;
    type?: ContentType;
    author?: Author;
    publishedTime?: string;
    modifiedTime?: string;
    keywords?: string[];
    organization?: Organization;
    twitterCard?: TwitterCardType;
    noindex?: boolean;
    canonicalUrl?: string;
    locale?: string;
    alternateLocales?: string[];
    siteName?: string;
    articleTags?: string[];
    section?: string;
    article?: ArticleData;
    breadcrumb?: BreadcrumbItem[];
    analytics?: {
      gtmId?: string;
      gaId?: string;
      fbPixelId?: string;
    };
  }