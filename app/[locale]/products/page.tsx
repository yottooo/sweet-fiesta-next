import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import productsPageData from "@/data/products_page.json";
import { getMessages } from "@/lib/i18n";
import ProductGrid from "@/components/ProductGrid";
import {
  CategoryEntry,
  ProductEntry,
  ProductsPageEntry,
  getLocalizedTranslation,
  getSortValue,
  stripHtml,
} from "@/lib/site";
import {
  JsonLd,
  breadcrumbJsonLd,
  createSeoMetadata,
  getHomePath,
  getProductsPath,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pageEntry = (productsPageData as ProductsPageEntry[])[0];
  const pageInfo = getLocalizedTranslation(pageEntry, locale);

  return createSeoMetadata({
    title: pageInfo.seo_title || pageInfo.title,
    description: pageInfo.seo_description || pageInfo.description || pageInfo.title,
    path: getProductsPath(locale),
    alternatePaths: {
      bg: getProductsPath("bg"),
      en: getProductsPath("en"),
    },
    image: pageInfo.image
      ? `/uploads/images/product_page_seo_image/${pageInfo.image}`
      : undefined,
    locale,
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i18n = getMessages(locale);
  const products = (productsData as ProductEntry[])
    .filter(
      (product) =>
        String(getLocalizedTranslation(product, locale).is_published ?? "0") === "1",
    )
    .sort((left, right) => getSortValue(left.position) - getSortValue(right.position));
  const categories = categoriesData as CategoryEntry[];
  const pageInfo = getLocalizedTranslation((productsPageData as ProductsPageEntry[])[0], locale);
  const hasDescription = Boolean(stripHtml(pageInfo.description).length);

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: i18n["ÐÐ°Ñ‡Ð°Ð»Ð¾"] || "Home", path: getHomePath(locale) },
          { name: pageInfo.title, path: getProductsPath(locale) },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: pageInfo.title,
          itemListElement: products.map((product, index) => {
            const productContent = getLocalizedTranslation(product, locale);

            return {
              "@type": "ListItem",
              position: index + 1,
              name: productContent.title,
            };
          }),
        }}
      />
      <div
        className="breadcrumb-area shadow text-center dark bg-fixed text-light"
        style={{ backgroundImage: `url(/uploads/images/product_page_seo_image/${pageInfo.image})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>{pageInfo.title}</h1>
              <ul className="breadcrumb">
                <li>
                  <Link href={`/${locale}`}>
                    <i className="fas fa-home"></i> {i18n["Начало"] || "Home"}
                  </Link>
                </li>
                <li className="active">{pageInfo.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {hasDescription ? (
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="products-description-above-filter"
                dangerouslySetInnerHTML={{ __html: pageInfo.description || "" }}
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="food-menu-area inc-isotop default-padding">
        <div className="container">
          <Suspense fallback={null}>
            <ProductGrid
            products={products}
            categories={categories}
            locale={locale}
            allLabel={i18n["Всички"] || "All"}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
