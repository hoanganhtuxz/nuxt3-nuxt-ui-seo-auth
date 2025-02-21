import type { BreadcrumbItem } from "~/types/seo";

export const useBreadcrumbSchema = (breadcrumb?: BreadcrumbItem[]) => {
    if (!breadcrumb?.length) return undefined;
  
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  };