"use client";

import { useState } from "react";

export default function ProductGrid({ 
  products, 
  categories, 
  locale, 
  allLabel 
}: { 
  products: any[], 
  categories: any[], 
  locale: string,
  allLabel: string
}) {
  const [filter, setFilter] = useState("*");

  const filteredProducts = filter === "*" 
    ? products 
    : products.filter(p => p.category_id === filter);

  return (
    <div className="portfolio-items-area">
      <div className="row">
        <div className="col-md-12 portfolio-content">
          {/* Category Filters */}
          <div className="mix-item-menu text-center">
            <button 
              className={filter === "*" ? "active" : ""} 
              onClick={() => setFilter("*")}
            >
              {allLabel}
            </button>
            {categories.map(cat => {
              const catContent = cat.translations[locale] || cat.translations['en'];
              return (
                <button 
                  key={cat.id} 
                  className={filter === cat.id ? "active" : ""} 
                  onClick={() => setFilter(cat.id)}
                >
                  {catContent.title}
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="row portfolio-items">
            {filteredProducts.map(product => {
              const content = product.translations[locale] || product.translations['en'];
              const category = categories.find(c => c.id === product.category_id);
              const catTitle = category?.translations[locale]?.title || "";
              
              return (
                <div key={product.id} className="col-md-4 col-sm-6 single-item mt-30">
                  <div className="item">
                    <div className="thumb">
                      <img 
                        src={`/uploads/images/product_images/${content.image || 'default.jpg'}`} 
                        alt={content.image_alt || content.title} 
                      />
                      <div className="overlay">
                        <div className="content">
                          <h4>{content.title}</h4>
                          <span>{catTitle}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
