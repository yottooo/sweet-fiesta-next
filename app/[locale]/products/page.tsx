import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import productsPageData from "@/data/products_page.json";
import { getMessages, t } from "@/lib/i18n";
import ProductGrid from "@/components/ProductGrid";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i18n = getMessages(locale);
  
  const products = productsData as any[];
  const categories = categoriesData as any[];
  const pageInfo = (productsPageData as any[])[0].translations[locale] || (productsPageData as any[])[0].translations['en'];

  return (
    <main>
      <div className="breadcrumb-area shadow dark bg-fixed text-light" 
           style={{backgroundImage: `url(/uploads/images/product_page_seo_image/${pageInfo.image})`}}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1>{pageInfo.title}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="portfolio-area default-padding">
        <div className="container">
          <ProductGrid 
            products={products} 
            categories={categories} 
            locale={locale} 
            allLabel={i18n['Всички'] || 'All'} 
          />
        </div>
      </div>
    </main>
  );
}
