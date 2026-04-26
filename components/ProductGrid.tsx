"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CategoryEntry,
  ProductEntry,
  getCategoryFilterParam,
  getCategoryFilterTokens,
  getLocalizedTranslation,
  resolveCategoryFilter,
} from "@/lib/site";

type ProductGridProps = {
  products: ProductEntry[];
  categories: CategoryEntry[];
  locale: string;
  allLabel: string;
};

export default function ProductGrid({
  products,
  categories,
  locale,
  allLabel,
}: ProductGridProps) {
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState("*");

  useEffect(() => {
    const requestedFilter =
      searchParams.get(getCategoryFilterParam(locale)) ??
      searchParams.get("category") ??
      searchParams.get("kategoriya");

    setFilter(resolveCategoryFilter(categories, requestedFilter));
  }, [categories, locale, searchParams]);

  const filteredProducts =
    filter === "*" ? products : products.filter((product) => product.category_id === filter);

  const applyFilter = (nextFilter: string) => {
    setFilter(nextFilter);

    if (typeof window === "undefined") {
      return;
    }

    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.delete("category");
    nextUrl.searchParams.delete("kategoriya");

    if (nextFilter !== "*") {
      const selectedCategory = categories.find((category) => category.id === nextFilter);

      if (selectedCategory) {
        const categoryTokens = getCategoryFilterTokens(selectedCategory);
        nextUrl.searchParams.set(
          getCategoryFilterParam(locale),
          locale === "bg" ? categoryTokens.bg : categoryTokens.en,
        );
      }
    }

    window.history.replaceState(window.history.state, "", nextUrl);
  };

  return (
    <div className="food-menu-area text-center">
      <div className="row">
        <div className="col-md-12 food-menu-content">
          <div className="row">
            <div className="col-md-3">
              <div className="mix-item-menu text-center">
                <button
                  type="button"
                  className={filter === "*" ? "active" : ""}
                  onClick={() => applyFilter("*")}
                >
                  {allLabel}
                </button>
                {categories.map((category) => {
                  const categoryContent = getLocalizedTranslation(category, locale);

                  return (
                    <button
                      key={category.id}
                      type="button"
                      className={filter === category.id ? "active" : ""}
                      onClick={() => applyFilter(category.id)}
                    >
                      {categoryContent.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="col-md-9">
              <div className="row text-center">
                <div id="portfolio-grid" className="menu-lists text-center col-3">
                  {filteredProducts.map((product) => {
                    const productContent = getLocalizedTranslation(product, locale);
                    const category = categories.find(
                      (categoryItem) => categoryItem.id === product.category_id,
                    );
                    const categoryTitle = category
                      ? getLocalizedTranslation(category, locale).title
                      : "";
                    const hasImage = Boolean(productContent.image);

                    return (
                      <div key={product.id} className="item-single pf-item">
                        <div className="item item-p-p">
                          <div className="thumb">
                            {hasImage ? (
                              <img
                                src={`/uploads/images/product_images/${productContent.image}`}
                                alt={productContent.image_alt || productContent.title}
                                title={productContent.image_title || productContent.title}
                              />
                            ) : (
                              <div className="placeholder-image">
                                <i className="fa fa-picture-o"></i>
                              </div>
                            )}
                            <div className="overlay">
                              <div className="content">
                                <h4>{productContent.title}</h4>
                                <span>{categoryTitle}</span>
                              </div>
                            </div>
                          </div>

                          <div className="info product-info-match-height">
                            <h4>{productContent.title}</h4>
                            {productContent.description?.trim() ? (
                              <div dangerouslySetInnerHTML={{ __html: productContent.description }} />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
