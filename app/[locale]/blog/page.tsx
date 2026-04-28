import type { Metadata } from "next";
import blogData from "@/data/blog.json";
import { formatDisplayDate, getLocalizedTranslation, stripHtml, truncate } from "@/lib/site";
import {
  JsonLd,
  breadcrumbJsonLd,
  createSeoMetadata,
  getBlogPath,
  getHomePath,
} from "@/lib/seo";

type BlogTranslation = {
  title: string;
  description: string;
  image?: string;
  image_alt?: string;
  image_title?: string;
  seo_title?: string;
  seo_description?: string;
  slug: string;
};

type BlogEntry = {
  id: string;
  blog_date: string;
  translations: Record<string, BlogTranslation>;
};

const BLOG_COVER = "/images/static/sweet-fiesta-blog-cover-photo.jpg";

function getLabels(locale: string) {
  if (locale === "bg") {
    return {
      blog: "Блог",
      home: "Начало",
      description:
        "Блогът на Сладка Фиеста. Прочетете нещо интересно за нашето сладко изкуство и разберете повече от полезни ни статии и актуални новини.",
      cta: "ВИЖ ОЩЕ",
    };
  }

  return {
    blog: "Blog",
    home: "Home",
    description:
      "The Sweet Fiesta blog. Read something interesting about our sweet craft and find out more from our useful articles and current news.",
    cta: "SEE MORE",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const labels = getLabels(locale);

  return createSeoMetadata({
    title:
      locale === "bg"
        ? "Блог | Сладка Фиеста"
        : "Blog | Sweet Fiesta",
    description: labels.description,
    path: getBlogPath(locale),
    alternatePaths: {
      bg: getBlogPath("bg"),
      en: getBlogPath("en"),
    },
    image: BLOG_COVER,
    locale,
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const labels = getLabels(locale);
  const posts = [...(blogData as BlogEntry[])].sort(
    (left, right) => new Date(right.blog_date).getTime() - new Date(left.blog_date).getTime(),
  );

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: labels.home, path: getHomePath(locale) },
          { name: labels.blog, path: getBlogPath(locale) },
        ])}
      />
      <div
        className="breadcrumb-area shadow text-center dark bg-fixed text-light"
        style={{ backgroundImage: `url(${BLOG_COVER})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>{labels.blog}</h1>
              <ul className="breadcrumb">
                <li>
                  <a href={`/${locale}`}>
                    <i className="fas fa-home"></i> {labels.home}
                  </a>
                </li>
                <li className="active">{labels.blog}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-area full-blog blog-standard default-padding">
        <div className="container">
          <div className="row">
            <div className="blog-items">
              <div className="blog-content col-md-10 col-md-offset-1">
                {posts.map((post) => {
                  const translation = getLocalizedTranslation(post, locale);
                  const excerpt = truncate(stripHtml(translation.description), 260);

                  return (
                    <div key={post.id} className="single-item">
                      <div className="thumb margin-bottom-20">
                        <a href={`/${locale}/blog/${translation.slug}`}>
                          {translation.image ? (
                            <img
                              src={`/uploads/images/blog_images/${translation.image}`}
                              alt={translation.image_alt || translation.title}
                              title={translation.image_title || translation.title}
                            />
                          ) : null}
                        </a>
                        <div className="meta">
                          <ul>
                            <li>
                              <a href={`/${locale}/blog/${translation.slug}`}>
                                <i className="fas fa-calendar-alt"></i>{" "}
                                {formatDisplayDate(post.blog_date, locale)}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="info">
                        <h3>
                          <a href={`/${locale}/blog/${translation.slug}`}>{translation.title}</a>
                        </h3>
                        <p>{excerpt}</p>
                        <a className="btn circle btn-theme border btn-md" href={`/${locale}/blog/${translation.slug}`}>
                          {labels.cta}
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
    </main>
  );
}
