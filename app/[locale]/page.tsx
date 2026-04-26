import sliderData from "@/data/homepage_slider.json";
import homeData from "@/data/home.json";
import categoriesData from "@/data/categories.json";
import productsData from "@/data/products.json";
import blogData from "@/data/blog.json";
import contactData from "@/data/contact_us.json";
import { getMessages } from "@/lib/i18n";
import HeroCarousel from "@/components/HeroCarousel";

function getSortValue(position: unknown) {
  const value = Number(position);

  return Number.isFinite(value) ? value : Number.MAX_SAFE_INTEGER;
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i18n = getMessages(locale);
  
  const sliders = (sliderData as any[]).sort((a, b) => parseInt(a.position) - parseInt(b.position));
  const home = (homeData as any[])[0];
  const homeContent = home.translations[locale] || home.translations['en'];
  const categories = categoriesData as any[];
  const galleryProducts = (productsData as any[])
    .filter((product) => {
      const translation = product.translations[locale] || product.translations["en"];
      return translation?.image && String(translation.is_published ?? "0") === "1";
    })
    .sort((left, right) => getSortValue(left.position) - getSortValue(right.position))
    .slice(0, 6);
  const blogs = (blogData as any[]).sort((a, b) => new Date(b.blog_date).getTime() - new Date(a.blog_date).getTime());
  const contact = (contactData as any[])[0].translations[locale];

  return (
    <main>
      {/* Banner Area */}
      <div className="banner-area ds-fonts text-light text-center">
        <HeroCarousel
          slides={sliders.map((slider) => ({
            id: String(slider.id),
            content: slider.translations[locale] || slider.translations["en"],
          }))}
          previousLabel={i18n["Previous"] || "Previous"}
          nextLabel={i18n["Next"] || "Next"}
        />
        <div className="wavesshape">
          <img src="/images/static/shape.png" alt="Shape" />
        </div>
      </div>

      {/* About Section */}
      <div className="about-area default-padding">
        <div className="container">
          <div className="row">
            <div className="about-items">
              <div className="col-md-7 info">
                <h3 className="about-area-info-h">{homeContent.title}</h3>
                <h2>{homeContent.subtitle}</h2>
                <div dangerouslySetInnerHTML={{ __html: homeContent.description }} />
                <ul>
                  <li>
                    <div className="icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="info">
                      <h4>{i18n['Phone'] || 'Phone'}</h4>
                      <span>{contact.phone}</span>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="fas fa-envelope-open"></i>
                    </div>
                    <div className="info">
                      <h4>{i18n['Email'] || 'Email'}</h4>
                      <span>{contact.email}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-5">
                <img className="sweet-fiesta-image" src={`/uploads/images/homepage_slider_images/${homeContent.image}`} alt={homeContent.image_alt} title={homeContent.image_title} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="food-menu-area inc-isotop default-padding">
        <div className="container">
          <div className="food-menu-area text-center">
            <div className="row">
              <div className="col-md-12 food-menu-content">
                <div className="site-heading text-center">
                  <h3>{i18n['Нашите'] || 'Нашите'}</h3>
                  <h2>{i18n['Продукти'] || 'Продукти'}</h2>
                </div>
                <div id="portfolio-grid" className="menu-lists text-center col-4">
                  {categories.map((cat) => {
                    const catContent = cat.translations[locale] || cat.translations['en'];
                    return (
                      <div key={cat.id} className="item-single pf-item equal-height">
                        <div className="item">
                          <div className="thumb">
                            <a href={`/${locale}/products?category=${cat.id}`}>
                              <img src={`/uploads/images/product_images/${catContent.image}`} alt={catContent.image_alt} title={catContent.image_title} style={{width: '100%'}} />
                            </a>
                          </div>
                          <div className="info product-info-match-height">
                            <h4><a href={`/${locale}/products?category=${cat.id}`}>{catContent.title}</a></h4>
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

      {/* Gallery Section */}
      <div id="gallery" className="gallery-area uniform-gallery default-padding" style={{paddingTop: '65px'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="site-heading text-center">
                <h3>{i18n['Gallery'] || 'Gallery'}</h3>
                <h2>{i18n['Направено с наши продукти'] || 'Направено с наши продукти'}</h2>
              </div>
            </div>
          </div>
          <div className="gallery-items col-3">
            <div className="row">
              <div className="col-md-12 text-center food-menu-content">
                <div className="row magnific-mix-gallery text-center masonary">
                  {galleryProducts.map((product) => {
                    const content = product.translations[locale] || product.translations['en'];
                    return (
                      <div key={product.id} className="pf-item">
                        <div className="item-effect">
                          <img src={`/uploads/images/product_images/${content.image}`} alt={content.image_alt} title={content.image_title} />
                          <a href={`/uploads/images/product_images/${content.image}`} className="item popup-link"><i className="fa fa-plus"></i></a>
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

      {/* Blog Area */}
      <div className="blog-area default-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="site-heading text-center">
                <h3>{i18n['Blog'] || 'Blog'}</h3>
                <h2>{i18n['Последни новини'] || 'Последни новини'}</h2>
                <p>{i18n['Прочетете нещо интересно за нашето сладко изкуство и разберете повече от полезни ни статии и актуални новини.'] || 'Прочетете нещо интересно за нашето сладко изкуство и разберете повече от полезни ни статии и актуални новини.'}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="blog-items">
              {blogs.length > 0 && (
                <>
                  <div className="col-md-6 default">
                    <div className="single-item">
                      <div className="thumb">
                        <a href={`/${locale}/blog/${blogs[0].translations[locale]?.slug || blogs[0].translations['en']?.slug}`}>
                          <img src={`/uploads/images/blog_images/${blogs[0].translations[locale]?.image || blogs[0].translations['en']?.image}`} alt="Blog" />
                        </a>
                        <div className="meta">
                          <ul>
                            <li>
                              <a href={`/${locale}/blog/${blogs[0].translations[locale]?.slug || blogs[0].translations['en']?.slug}`}>
                                <i className="fas fa-calendar-alt"></i> {new Date(blogs[0].blog_date).toLocaleDateString(locale === 'bg' ? 'bg-BG' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="info">
                        <h3 className="margin-top-20">
                          <a href={`/${locale}/blog/${blogs[0].translations[locale]?.slug || blogs[0].translations['en']?.slug}`}>
                            {blogs[0].translations[locale]?.title || blogs[0].translations['en']?.title}
                          </a>
                        </h3>
                        <p>{(blogs[0].translations[locale]?.description || blogs[0].translations['en']?.description || '').replace(/<[^>]*>?/gm, '').substring(0, 176)}...</p>
                        <a className="btn circle btn-theme border btn-md" href={`/${locale}/blog/${blogs[0].translations[locale]?.slug || blogs[0].translations['en']?.slug}`}>
                          {i18n['Прочети още'] || 'Прочети още'}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 flex">
                    {blogs.slice(1, 3).map((blog) => (
                      <div key={blog.id} className="single-item flex">
                        <div className="thumb">
                          <a href={`/${locale}/blog/${blog.translations[locale]?.slug || blog.translations['en']?.slug}`}>
                            <img src={`/uploads/images/blog_images/${blog.translations[locale]?.image || blog.translations['en']?.image}`} alt="Blog" />
                          </a>
                        </div>
                        <div className="info">
                          <div className="meta">
                            <ul>
                              <li>
                                <a href={`/${locale}/blog/${blog.translations[locale]?.slug || blog.translations['en']?.slug}`}>
                                  <i className="fas fa-calendar-alt"></i> {new Date(blog.blog_date).toLocaleDateString(locale === 'bg' ? 'bg-BG' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </a>
                              </li>
                            </ul>
                          </div>
                          <h4>
                            <a href={`/${locale}/blog/${blog.translations[locale]?.slug || blog.translations['en']?.slug}`}>
                              {blog.translations[locale]?.title || blog.translations['en']?.title}
                            </a>
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
