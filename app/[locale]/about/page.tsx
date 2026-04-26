import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import aboutData from "@/data/about_us.json";
import blogData from "@/data/blog.json";
import {
  AboutEntry,
  BlogEntry,
  formatDisplayDate,
  getAboutPath,
  getLocalizedTranslation,
} from "@/lib/site";

function getLabels(locale: string) {
  if (locale === "bg") {
    return {
      home: "Начало",
      section: "За Нас",
      blog: "Блог",
    };
  }

  return {
    home: "Home",
    section: "About Us",
    blog: "Blog",
  };
}

function getAboutEntries() {
  return aboutData as AboutEntry[];
}

function getSelectedAboutEntry(locale: string, slug?: string) {
  const entries = getAboutEntries();

  if (!entries.length) {
    return null;
  }

  if (!slug) {
    return entries[0];
  }

  return (
    entries.find((entry) => getLocalizedTranslation(entry, locale).slug === slug) ?? null
  );
}

export function getAboutMetadata(locale: string, slug?: string): Metadata {
  const selectedEntry = getSelectedAboutEntry(locale, slug);

  if (!selectedEntry) {
    return {};
  }

  const translation = getLocalizedTranslation(selectedEntry, locale);

  return {
    title: translation.seo_title || translation.title,
    description: translation.seo_description || translation.title,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getAboutMetadata(locale);
}

export function renderAboutPage(locale: string, slug?: string) {
  const labels = getLabels(locale);
  const aboutEntries = getAboutEntries();
  const currentEntry = getSelectedAboutEntry(locale, slug);

  if (!currentEntry) {
    notFound();
  }

  const currentTranslation = getLocalizedTranslation(currentEntry, locale);
  const recentBlogs = [...(blogData as BlogEntry[])]
    .sort((left, right) => new Date(right.blog_date).getTime() - new Date(left.blog_date).getTime())
    .slice(0, 3);

  return (
    <main>
      <div
        className="breadcrumb-area shadow text-center dark bg-fixed text-light"
        style={{
          backgroundImage: `url(${
            currentTranslation.image
              ? `/uploads/images/about_us_images/${currentTranslation.image}`
              : "/images/static/2440x1578.png"
          })`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>{currentTranslation.title}</h1>
              <ul className="breadcrumb">
                <li>
                  <Link href={`/${locale}`}>
                    <i className="fas fa-home"></i> {labels.home}
                  </Link>
                </li>
                <li>{labels.section}</li>
                <li className="active">{currentTranslation.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-area single full-blog left-sidebar default-padding">
        <div className="container">
          <div className="row">
            <div className="blog-items">
              <div className="blog-content col-md-8">
                <div className="single-item">
                  <div className="info">
                    <h3>{currentTranslation.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: currentTranslation.description }} />
                  </div>
                </div>
              </div>

              <div className="sidebar col-md-4">
                <aside>
                  <div className="sidebar-item category">
                    <div className="title">
                      <h4>{labels.section}</h4>
                    </div>
                    <div className="sidebar-info">
                      <ul>
                        {aboutEntries.map((entry) => {
                          const translation = getLocalizedTranslation(entry, locale);

                          return (
                            <li key={entry.id}>
                              <Link
                                className={entry.id === currentEntry.id ? "active" : ""}
                                href={getAboutPath(locale, translation.slug)}
                              >
                                {translation.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  <div className="sidebar-item recent-post">
                    <div className="title">
                      <h4>{labels.blog}</h4>
                    </div>
                    <ul>
                      {recentBlogs.map((blog) => {
                        const translation = getLocalizedTranslation(blog, locale);
                        const href = `/${locale}/blog/${translation.slug}`;

                        return (
                          <li key={blog.id}>
                            <div className="thumb">
                              <Link href={href}>
                                {translation.image ? (
                                  <img
                                    src={`/uploads/images/blog_images/${translation.image}`}
                                    alt={translation.image_alt || translation.title}
                                    title={translation.image_title || translation.title}
                                  />
                                ) : null}
                              </Link>
                            </div>
                            <div className="info">
                              <Link href={href}>{translation.title}</Link>
                              <div className="meta-title">
                                <span className="post-date">
                                  {formatDisplayDate(blog.blog_date, locale)}
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return renderAboutPage(locale);
}
