import type { Metadata } from "next";
import { notFound } from "next/navigation";
import blogData from "@/data/blog.json";
import { formatDisplayDate, getLocalizedTranslation } from "@/lib/site";
import {
  JsonLd,
  absoluteUrl,
  breadcrumbJsonLd,
  createSeoMetadata,
  getBlogPath,
  getBlogPostPath,
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
  updated_at?: string;
};

type BlogEntry = {
  id: string;
  blog_date: string;
  updated_at?: string;
  translations: Record<string, BlogTranslation>;
};

const BLOG_COVER = "/images/static/sweet-fiesta-blog-cover-photo.jpg";

function getSortedPosts() {
  return [...(blogData as BlogEntry[])].sort(
    (left, right) => new Date(right.blog_date).getTime() - new Date(left.blog_date).getTime(),
  );
}

function getLabels(locale: string) {
  if (locale === "bg") {
    return {
      home: "Начало",
      blog: "Блог",
      previous: "Предишен",
      next: "Следващ",
    };
  }

  return {
    home: "Home",
    blog: "Blog",
    previous: "Previous",
    next: "Next",
  };
}

function findPost(locale: string, slug: string) {
  return getSortedPosts().find((post) => {
    const translation = post.translations[locale] || post.translations.en;
    return translation?.slug === slug;
  });
}

export function generateStaticParams() {
  return (blogData as BlogEntry[]).flatMap((post) =>
    ["bg", "en"].flatMap((locale) => {
      const translation = post.translations[locale] || post.translations.en;
      return translation?.slug ? [{ locale, slug: translation.slug }] : [];
    }),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = findPost(locale, slug);

  if (!post) {
    return {};
  }

  const translation = getLocalizedTranslation(post, locale);

  const image = translation.image
    ? `/uploads/images/blog_images/${translation.image}`
    : BLOG_COVER;
  const alternatePaths = Object.fromEntries(
    ["bg", "en"].flatMap((alternateLocale) => {
      const alternateTranslation = post.translations[alternateLocale] || post.translations.en;
      return alternateTranslation?.slug
        ? [[alternateLocale, getBlogPostPath(alternateLocale, alternateTranslation.slug)]]
        : [];
    }),
  );

  return createSeoMetadata({
    title: translation.seo_title || translation.title,
    description: translation.seo_description || translation.title,
    path: getBlogPostPath(locale, translation.slug),
    alternatePaths,
    image,
    locale,
    type: "article",
    publishedTime: currentPostDate(post.blog_date),
    modifiedTime: post.updated_at ? currentPostDate(post.updated_at) : undefined,
  });
}

function currentPostDate(value: string) {
  return new Date(value).toISOString();
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const labels = getLabels(locale);
  const posts = getSortedPosts();
  const currentIndex = posts.findIndex((post) => {
    const translation = post.translations[locale] || post.translations.en;
    return translation?.slug === slug;
  });

  if (currentIndex === -1) {
    notFound();
  }

  const currentPost = posts[currentIndex];
  const currentTranslation = getLocalizedTranslation(currentPost, locale);
  const previousPost = posts[currentIndex + 1];
  const nextPost = posts[currentIndex - 1];

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: labels.home, path: getHomePath(locale) },
          { name: labels.blog, path: getBlogPath(locale) },
          { name: currentTranslation.title, path: getBlogPostPath(locale, currentTranslation.slug) },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: currentTranslation.title,
          description: currentTranslation.seo_description || currentTranslation.title,
          image: currentTranslation.image
            ? absoluteUrl(`/uploads/images/blog_images/${currentTranslation.image}`)
            : absoluteUrl(BLOG_COVER),
          datePublished: currentPostDate(currentPost.blog_date),
          dateModified: currentPost.updated_at
            ? currentPostDate(currentPost.updated_at)
            : currentPostDate(currentPost.blog_date),
          mainEntityOfPage: absoluteUrl(getBlogPostPath(locale, currentTranslation.slug)),
          author: {
            "@type": "Organization",
            name: "Sweet Fiesta",
          },
          publisher: {
            "@type": "Organization",
            name: "Sweet Fiesta",
            logo: {
              "@type": "ImageObject",
              url: absoluteUrl("/images/static/logo.png"),
            },
          },
        }}
      />
      <div
        className="breadcrumb-area shadow text-center dark bg-fixed text-light"
        style={{ backgroundImage: `url(${BLOG_COVER})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>{currentTranslation.title}</h1>
              <ul className="breadcrumb">
                <li>
                  <a href={`/${locale}`}>
                    <i className="fas fa-home"></i> {labels.home}
                  </a>
                </li>
                <li>
                  <a href={`/${locale}/blog`}>{labels.blog}</a>
                </li>
                <li className="active">{currentTranslation.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-area single full-blog default-padding">
        <div className="container">
          <div className="row">
            <div className="blog-items">
              <div className="blog-content col-md-10 col-md-offset-1">
                <div className="single-item">
                  <div className="thumb margin-bottom-20">
                    {currentTranslation.image ? (
                      <div className="image-box">
                        <figure>
                          <img
                            src={`/uploads/images/blog_images/${currentTranslation.image}`}
                            alt={currentTranslation.image_alt || currentTranslation.title}
                            title={currentTranslation.image_title || currentTranslation.title}
                          />
                        </figure>
                      </div>
                    ) : null}

                    <div className="meta">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fas fa-calendar-alt"></i>{" "}
                            {formatDisplayDate(currentPost.blog_date, locale)}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className="info"
                    dangerouslySetInnerHTML={{ __html: currentTranslation.description }}
                  />
                </div>

                <div className="post-common">
                  <div className="post-pagi-area">
                    {previousPost ? (
                      <a href={`/${locale}/blog/${getLocalizedTranslation(previousPost, locale).slug}`}>
                        <i className="fas fa-angle-double-left"></i> {labels.previous}
                      </a>
                    ) : (
                      <a href="" className="not-active">
                        <i className="fas fa-angle-double-left"></i> {labels.previous}
                      </a>
                    )}

                    {nextPost ? (
                      <a href={`/${locale}/blog/${getLocalizedTranslation(nextPost, locale).slug}`}>
                        {labels.next} <i className="fas fa-angle-double-right"></i>
                      </a>
                    ) : (
                      <a href="" className="not-active">
                        {labels.next} <i className="fas fa-angle-double-right"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
