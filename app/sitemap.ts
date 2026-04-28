import type { MetadataRoute } from "next";
import aboutData from "@/data/about_us.json";
import blogData from "@/data/blog.json";
import {
  AboutEntry,
  BlogEntry,
  getLocalizedTranslation,
} from "@/lib/site";
import {
  LOCALES,
  SITE_URL,
  SiteLocale,
  absoluteUrl,
  getBlogPath,
  getBlogPostPath,
  getHomePath,
  getLanguageAlternates,
  getLocalizedAboutPath,
  getLocalizedContactsPath,
  getProductsPath,
} from "@/lib/seo";

export const dynamic = "force-static";

function entry(
  path: string,
  alternates: Partial<Record<SiteLocale, string>>,
  lastModified?: string | null,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: lastModified ? new Date(lastModified) : undefined,
    alternates: {
      languages: getLanguageAlternates(alternates),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    urls.push(
      entry(getHomePath(locale), {
        bg: getHomePath("bg"),
        en: getHomePath("en"),
      }),
      entry(getProductsPath(locale), {
        bg: getProductsPath("bg"),
        en: getProductsPath("en"),
      }),
      entry(getBlogPath(locale), {
        bg: getBlogPath("bg"),
        en: getBlogPath("en"),
      }),
      entry(getLocalizedContactsPath(locale), {
        bg: getLocalizedContactsPath("bg"),
        en: getLocalizedContactsPath("en"),
      }),
    );
  }

  for (const post of blogData as BlogEntry[]) {
    const alternates = Object.fromEntries(
      LOCALES.flatMap((locale) => {
        const translation = post.translations[locale] || post.translations.en;
        return translation?.slug ? [[locale, getBlogPostPath(locale, translation.slug)]] : [];
      }),
    ) as Partial<Record<SiteLocale, string>>;

    for (const locale of LOCALES) {
      const translation = post.translations[locale] || post.translations.en;

      if (translation?.slug) {
        urls.push(entry(getBlogPostPath(locale, translation.slug), alternates, post.updated_at));
      }
    }
  }

  for (const about of aboutData as AboutEntry[]) {
    const alternates = Object.fromEntries(
      LOCALES.flatMap((locale) => {
        const translation = getLocalizedTranslation(about, locale);
        return translation?.slug ? [[locale, getLocalizedAboutPath(locale, translation.slug)]] : [];
      }),
    ) as Partial<Record<SiteLocale, string>>;

    for (const locale of LOCALES) {
      const translation = getLocalizedTranslation(about, locale);

      if (translation?.slug) {
        urls.push(entry(getLocalizedAboutPath(locale, translation.slug), alternates, about.updated_at));
      }
    }
  }

  return [
    {
      url: `${SITE_URL}/`,
      alternates: {
        languages: getLanguageAlternates({
          bg: getHomePath("bg"),
          en: getHomePath("en"),
        }),
      },
    },
    ...urls,
  ];
}
