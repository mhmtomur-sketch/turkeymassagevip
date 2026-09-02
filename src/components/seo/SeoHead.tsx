import React, { useEffect } from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  keywords?: string;
  noindex?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
  schemaData?: Record<string, any>;
}

export function SeoHead({
  title,
  description,
  canonicalUrl = 'https://turkeymassagevip.com/',
  ogImage = 'https://turkeymassagevip.com/og-image.jpg',
  ogType = 'website',
  keywords = 'masaj, masöz, masör, spa, hamam, masaj salonu, otel spa, wellness, VIP masaj',
  noindex = false,
  breadcrumbs = [],
  schemaData
}: SeoHeadProps) {
  useEffect(() => {
    // 1. Title
    document.title = `${title} | Turkey Massage VIP`;

    // 2. Meta Helper
    const setMeta = (nameAttr: string, nameValue: string, contentValue: string) => {
      let meta = document.querySelector(`meta[${nameAttr}="${nameValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(nameAttr, nameValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', contentValue);
    };

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 4. Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', 'Turkey Massage VIP');
    setMeta('property', 'og:locale', 'tr_TR');

    // 5. Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // 6. JSON-LD Schemas
    const schemas: any[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Turkey Massage VIP',
        'url': 'https://turkeymassagevip.com/',
        'description': 'Türkiye Geneli Masaj, Masöz, Masör, Spa ve Hamam Rehberi',
        'inLanguage': 'tr-TR'
      }
    ];

    if (breadcrumbs && breadcrumbs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': b.name,
          'item': b.url.startsWith('http') ? b.url : `https://turkeymassagevip.com${b.url}`
        }))
      });
    }

    if (schemaData) {
      schemas.push(schemaData);
    }

    let scriptTag = document.getElementById('tmv-json-ld-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'tmv-json-ld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemas.length === 1 ? schemas[0] : schemas);
  }, [title, description, canonicalUrl, ogImage, ogType, keywords, noindex, breadcrumbs, schemaData]);

  return null;
}
