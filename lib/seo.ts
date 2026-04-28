import type { Metadata } from "next";
import { createElement } from "react";
import { stripHtml, truncate } from "@/lib/site";

export const SITE_URL = "https://sweetfiesta.bg";
export const SITE_NAME = "Sweet Fiesta";
export const LOCALES = ["bg", "en"] as const;
export type SiteLocale = (typeof LOCALES)[number];

export const DEFAULT_OG_IMAGE = "/images/static/sweet-fiesta-blog-cover-photo.jpg";

export function isSiteLocale(locale: string): locale is SiteLocale {
  return LOCALES.includes(locale as SiteLocale);
}

export function withTrailingSlash(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  const [pathname, search] = path.split("?");
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;

  return search ? `${normalizedPath}?${search}` : normalizedPath;
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const [pathname, search] = normalizedPath.split("?");

  if (/\.[a-z0-9]{2,5}$/i.test(pathname)) {
    return `${SITE_URL}${normalizedPath}`;
  }

  return `${SITE_URL}${withTrailingSlash(search ? `${pathname}?${search}` : pathname)}`;
}

export function getHomePath(locale: string) {
  return `/${locale}/`;
}

export function getProductsPath(locale: string) {
  return `/${locale}/products/`;
}

export function getBlogPath(locale: string) {
  return `/${locale}/blog/`;
}

export function getBlogPostPath(locale: string, slug: string) {
  return `/${locale}/blog/${slug}/`;
}

export function getLocalizedContactsPath(locale: string) {
  return locale === "bg" ? "/bg/kontakti/" : "/en/contact-us/";
}

export function getAboutIndexPath(locale: string) {
  return `/${locale}/about/`;
}

export function getLocalizedAboutPath(locale: string, slug: string) {
  const segment = locale === "bg" ? "za-nas" : "about-us";
  return `/${locale}/${segment}/${slug}/`;
}

export function getLanguageAlternates(paths: Partial<Record<SiteLocale, string>>) {
  const languages: Record<string, string> = {};

  for (const locale of LOCALES) {
    const path = paths[locale];

    if (path) {
      languages[locale] = absoluteUrl(path);
    }
  }

  if (paths.en) {
    languages["x-default"] = absoluteUrl(paths.en);
  }

  return languages;
}

export function cleanSeoText(value?: string | null, fallback = SITE_NAME) {
  const cleanValue = stripHtml(value).replace(/\s+/g, " ").trim();

  return cleanValue || fallback;
}

export function limitSeoDescription(value?: string | null, fallback = SITE_NAME) {
  return truncate(cleanSeoText(value, fallback), 155);
}

export function createSeoMetadata({
  title,
  description,
  path,
  alternatePaths,
  image = DEFAULT_OG_IMAGE,
  locale,
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  title: string;
  description?: string | null;
  path: string;
  alternatePaths: Partial<Record<SiteLocale, string>>;
  image?: string | null;
  locale: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Metadata {
  const safeTitle = cleanSeoText(title, SITE_NAME);
  const safeDescription = limitSeoDescription(description, safeTitle);
  const imageUrl = absoluteUrl(image || DEFAULT_OG_IMAGE);
  const url = absoluteUrl(path);

  return {
    metadataBase: new URL(SITE_URL),
    title: safeTitle,
    description: safeDescription,
    alternates: {
      canonical: url,
      languages: getLanguageAlternates(alternatePaths),
    },
    openGraph: {
      title: safeTitle,
      description: safeDescription,
      url,
      siteName: SITE_NAME,
      locale: locale === "bg" ? "bg_BG" : "en_US",
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: safeTitle,
        },
      ],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: safeTitle,
      description: safeDescription,
      images: [imageUrl],
    },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return createElement("script", {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  });
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "FoodEstablishment"],
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/images/static/logo.png"),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    telephone: "+359888733606",
    email: "nimas64_88@abv.bg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Oborishte 29",
      addressLocality: "Voivodinovo",
      addressCountry: "BG",
    },
  };
}
