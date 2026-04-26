export type Locale = "bg" | "en";

type TranslationMap<T> = Partial<Record<Locale, T>> & Record<string, T>;

type NullableString = string | null | undefined;

export type SliderTranslation = {
  title: string;
  subtitle: string;
  image: string;
  buttontittle?: NullableString;
  buttonlink?: NullableString;
};

export type SliderEntry = {
  id: string;
  position?: NullableString;
  translations: TranslationMap<SliderTranslation>;
};

export type HomeTranslation = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  image_alt?: NullableString;
  image_title?: NullableString;
  image_banner1?: NullableString;
  image_alt_banner1?: NullableString;
  image_title_banner1?: NullableString;
  image_banner2?: NullableString;
  image_alt_banner2?: NullableString;
  image_title_banner2?: NullableString;
  link_banner1?: NullableString;
  link_banner2?: NullableString;
  seo_title?: NullableString;
  seo_description?: NullableString;
};

export type HomeEntry = {
  id: string;
  updated_at?: NullableString;
  translations: TranslationMap<HomeTranslation>;
};

export type CategoryTranslation = {
  title: string;
  image?: NullableString;
  image_alt?: NullableString;
  image_title?: NullableString;
};

export type CategoryEntry = {
  id: string;
  position?: NullableString;
  created_at?: NullableString;
  updated_at?: NullableString;
  translations: TranslationMap<CategoryTranslation>;
};

export type ImageTranslation = {
  image_alt?: NullableString;
  image_title?: NullableString;
};

export type ImageEntry = {
  id: string;
  image?: NullableString;
  gallery_id?: NullableString;
  position?: NullableString;
  translations: TranslationMap<ImageTranslation>;
};

export type BlogTranslation = {
  title: string;
  description: string;
  image?: NullableString;
  image_alt?: NullableString;
  image_title?: NullableString;
  seo_title?: NullableString;
  seo_description?: NullableString;
  slug: string;
};

export type BlogEntry = {
  id: string;
  blog_date: string;
  created_at?: NullableString;
  updated_at?: NullableString;
  translations: TranslationMap<BlogTranslation>;
};

export type ContactTranslation = {
  title: string;
  description?: NullableString;
  phone?: NullableString;
  phone_1?: NullableString;
  phone_2?: NullableString;
  phone_3?: NullableString;
  phone_4?: NullableString;
  email?: NullableString;
  email_1?: NullableString;
  email_2?: NullableString;
  email_3?: NullableString;
  email_4?: NullableString;
  facebook?: NullableString;
  youtube?: NullableString;
  linkedin?: NullableString;
  address?: NullableString;
  footer_text?: NullableString;
  image?: NullableString;
  seo_title?: NullableString;
  seo_description?: NullableString;
};

export type ContactEntry = {
  id: string;
  position?: NullableString;
  updated_at?: NullableString;
  translations: TranslationMap<ContactTranslation>;
};

export type ProductTranslation = {
  title: string;
  description?: NullableString;
  image?: NullableString;
  image_alt?: NullableString;
  image_title?: NullableString;
  is_published?: NullableString | number;
};

export type ProductEntry = {
  id: string;
  category_id: string;
  position?: NullableString;
  translations: TranslationMap<ProductTranslation>;
};

export type ProductsPageTranslation = {
  title: string;
  description?: NullableString;
  image?: NullableString;
  seo_title?: NullableString;
  seo_description?: NullableString;
};

export type ProductsPageEntry = {
  id: string;
  updated_at?: NullableString;
  translations: TranslationMap<ProductsPageTranslation>;
};

export type AboutTranslation = {
  title: string;
  description: string;
  image?: NullableString;
  seo_title?: NullableString;
  seo_description?: NullableString;
  slug: string;
};

export type AboutEntry = {
  id: string;
  position?: NullableString;
  created_at?: NullableString;
  updated_at?: NullableString;
  translations: TranslationMap<AboutTranslation>;
};

export function getLocalizedTranslation<T>(
  item: { translations?: TranslationMap<T> },
  locale: string,
): T {
  const translations = item.translations ?? {};

  if (translations[locale]) {
    return translations[locale];
  }

  if (translations.en) {
    return translations.en;
  }

  const firstTranslation = Object.values(translations)[0];

  if (!firstTranslation) {
    throw new Error(`Missing translations for locale "${locale}"`);
  }

  return firstTranslation;
}

export function getSortValue(position: unknown) {
  const value = Number(position);

  return Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER;
}

export function formatDisplayDate(value: string, locale: string) {
  return new Date(value).toLocaleDateString(locale === "bg" ? "bg-BG" : "en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function stripHtml(value?: string | null) {
  return (value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(value: string, length: number) {
  if (value.length <= length) {
    return value;
  }

  return `${value.slice(0, length).trimEnd()}...`;
}

const BG_TO_LATIN: Record<string, string> = {
  ж: "zh",
  ч: "ch",
  щ: "sht",
  ш: "sh",
  ю: "yu",
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  з: "z",
  и: "i",
  й: "j",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ъ: "y",
  ь: "x",
  я: "q",
};

export function normalizeCategoryToken(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("bg-BG")
    .split("")
    .map((character) => BG_TO_LATIN[character] ?? character)
    .join("")
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export function getCategoryFilterTokens(category: CategoryEntry) {
  const bgTitle = category.translations.bg?.title ?? category.translations.en?.title ?? "";
  const enTitle = category.translations.en?.title ?? bgTitle;

  return {
    bg: normalizeCategoryToken(bgTitle),
    en: normalizeCategoryToken(enTitle),
  };
}

export function resolveCategoryFilter(categories: CategoryEntry[], rawValue?: string | null) {
  if (!rawValue) {
    return "*";
  }

  const normalizedValue = normalizeCategoryToken(rawValue);

  for (const category of categories) {
    const tokens = getCategoryFilterTokens(category);

    if (
      normalizedValue === normalizeCategoryToken(category.id) ||
      normalizedValue === tokens.bg ||
      normalizedValue === tokens.en
    ) {
      return category.id;
    }
  }

  return "*";
}

export function getCategoryFilterParam(locale: string) {
  return locale === "bg" ? "kategoriya" : "category";
}

export function getProductsCategoryHref(locale: string, category: CategoryEntry) {
  const tokens = getCategoryFilterTokens(category);
  const value = locale === "bg" ? tokens.bg : tokens.en;

  return `/${locale}/products?${getCategoryFilterParam(locale)}=${value}`;
}

export function getAboutPath(locale: string, slug: string) {
  const segment = locale === "bg" ? "za-nas" : "about-us";
  return `/${locale}/${segment}/${slug}`;
}

export function getContactsPath(locale: string) {
  const segment = locale === "bg" ? "kontakti" : "contact-us";
  return `/${locale}/${segment}`;
}
