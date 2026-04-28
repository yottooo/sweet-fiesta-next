import type { Metadata } from "next";
import Link from "next/link";
import sliderData from "@/data/homepage_slider.json";
import homeData from "@/data/home.json";
import categoriesData from "@/data/categories.json";
import imageData from "@/data/images.json";
import blogData from "@/data/blog.json";
import contactData from "@/data/contact_us.json";
import { getMessages } from "@/lib/i18n";
import HeroCarousel from "@/components/HeroCarousel";
import {
  BlogEntry,
  CategoryEntry,
  ContactEntry,
  HomeEntry,
  ImageEntry,
  SliderEntry,
  formatDisplayDate,
  getLocalizedTranslation,
  getProductsCategoryHref,
  getSortValue,
  stripHtml,
  truncate,
} from "@/lib/site";
import {
  JsonLd,
  createSeoMetadata,
  getHomePath,
  organizationJsonLd,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const homeContent = getLocalizedTranslation((homeData as HomeEntry[])[0], locale);

  return createSeoMetadata({
    title: homeContent.seo_title || homeContent.title,
    description: homeContent.seo_description || homeContent.description,
    path: getHomePath(locale),
    alternatePaths: {
      bg: getHomePath("bg"),
      en: getHomePath("en"),
    },
    image: homeContent.image
      ? `/uploads/images/homepage_slider_images/${homeContent.image}`
      : undefined,
    locale,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i18n = getMessages(locale);
  const sliders = [...(sliderData as SliderEntry[])].sort(
    (left, right) => getSortValue(left.position) - getSortValue(right.position),
  );
  const homeContent = getLocalizedTranslation((homeData as HomeEntry[])[0], locale);
  const categories = categoriesData as CategoryEntry[];
  const galleryImages = [...(imageData as ImageEntry[])]
    .filter((image) => image.gallery_id === "3" && image.image)
    .sort((left, right) => getSortValue(left.position) - getSortValue(right.position))
    .slice(0, 6);
  const blogs = [...(blogData as BlogEntry[])].sort(
    (left, right) => new Date(right.blog_date).getTime() - new Date(left.blog_date).getTime(),
  );
  const contact = getLocalizedTranslation((contactData as ContactEntry[])[0], locale);

  return (
    <main>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Sweet Fiesta",
          url: "https://sweetfiesta.bg",
          inLanguage: locale,
        }}
      />
      <div className="banner-area ds-fonts text-light text-center">
        <HeroCarousel
          slides={sliders.map((slider) => ({
            id: slider.id,
            content: getLocalizedTranslation(slider, locale),
          }))}
          previousLabel={i18n["Previous"] || "Previous"}
          nextLabel={i18n["Next"] || "Next"}
        />

        <div className="wavesshape">
          <img src="/images/static/shape.png" alt="Shape" />
        </div>
      </div>

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
                      <h4>{i18n["Phone"] || "Phone"}</h4>
                      <span>
                      <a href="tel:+359888733606">{contact.phone}</a>
                        </span>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="fas fa-envelope-open"></i>
                    </div>
                    <div className="info">
                      <h4>{i18n["Email"] || "Email"}</h4>
                      <span>
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="col-md-5">
                <img
                  className="sweet-fiesta-image"
                  src={`/uploads/images/homepage_slider_images/${homeContent.image}`}
                  alt={homeContent.image_alt || homeContent.title}
                  title={homeContent.image_title || homeContent.title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="food-menu-area inc-isotop default-padding">
        <div className="container">
          <div className="food-menu-area text-center">
            <div className="row">
              <div className="col-md-12 food-menu-content">
                <div className="site-heading text-center">
                  <h3>{i18n["Нашите"] || "Нашите"}</h3>
                  <h2>{i18n["Продукти"] || "Продукти"}</h2>
                </div>

                <div id="portfolio-grid" className="menu-lists text-center col-4">
                  {categories.map((category) => {
                    const categoryContent = getLocalizedTranslation(category, locale);
                    const href = getProductsCategoryHref(locale, category);

                    return (
                      <div key={category.id} className="item-single pf-item equal-height">
                        <div className="item">
                          <div className="thumb">
                            <Link href={href}>
                              <img
                                src={`/uploads/images/product_images/${categoryContent.image}`}
                                alt={categoryContent.image_alt || categoryContent.title}
                                title={categoryContent.image_title || categoryContent.title}
                                style={{ width: "100%" }}
                              />
                            </Link>
                          </div>
                          <div className="info product-info-match-height">
                            <h4>
                              <Link href={href}>{categoryContent.title}</Link>
                            </h4>
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

      <div
        id="gallery"
        className="gallery-area uniform-gallery default-padding"
        style={{ paddingTop: "65px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="site-heading text-center">
                <h3>{i18n["Gallery"] || "Gallery"}</h3>
                <h2>
                  {i18n["Направено с наши продукти"] || "Направено с наши продукти"}
                </h2>
              </div>
            </div>
          </div>

          <div className="gallery-items col-3">
            <div className="row">
              <div className="col-md-12 text-center food-menu-content">
                <div className="row magnific-mix-gallery text-center masonary">
                  {galleryImages.map((image) => {
                    const content = getLocalizedTranslation(image, locale);

                    return (
                      <div key={image.id} className="pf-item">
                        <div className="item-effect">
                          <img
                            src={`/uploads/images/about_us_images/${image.image}`}
                            alt={content.image_alt || "Gallery image"}
                            title={content.image_title || "Gallery image"}
                          />
                          <a href={`/uploads/images/about_us_images/${image.image}`} className="item popup-link">
                            <i className="fa fa-plus"></i>
                          </a>
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

      <div className="blog-area home-blog-preview default-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="site-heading text-center">
                <h3>{i18n["Blog"] || "Blog"}</h3>
                <h2>{i18n["Последни новини"] || "Последни новини"}</h2>
                <p>
                  {i18n["Прочетете нещо интересно за нашето сладко изкуство и разберете повече от полезни ни статии и актуални новини."] ||
                    "Прочетете нещо интересно за нашето сладко изкуство и разберете повече от полезни ни статии и актуални новини."}
                </p>
              </div>
            </div>
          </div>

          <div className="home-blog-grid">
            {blogs.slice(0, 3).map((blog) => {
              const content = getLocalizedTranslation(blog, locale);
              const href = `/${locale}/blog/${content.slug}`;
              const excerpt = truncate(stripHtml(content.description), 176);

              return (
                <article key={blog.id} className="single-item home-blog-card">
                  <div className="thumb">
                    <Link href={href}>
                      <img
                        src={`/uploads/images/blog_images/${content.image}`}
                        alt={content.image_alt || content.title}
                        title={content.image_title || content.title}
                      />
                    </Link>

                    <div className="meta">
                      <ul>
                        <li>
                          <Link href={href}>
                            <i className="fas fa-calendar-alt"></i>{" "}
                            {formatDisplayDate(blog.blog_date, locale)}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="info">
                    <h3 className="margin-top-20">
                      <Link href={href}>{content.title}</Link>
                    </h3>
                    <p>{excerpt}</p>
                    <Link className="btn circle btn-theme border btn-md" href={href}>
                      {i18n["Прочети още"] || "Прочети още"}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
