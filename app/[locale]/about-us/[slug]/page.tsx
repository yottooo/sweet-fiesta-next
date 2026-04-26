import type { Metadata } from "next";
import aboutData from "@/data/about_us.json";
import { AboutEntry, getLocalizedTranslation } from "@/lib/site";
import { getAboutMetadata, renderAboutPage } from "../../about/page";

export function generateStaticParams() {
  return (aboutData as AboutEntry[])
    .map((entry) => getLocalizedTranslation(entry, "en").slug)
    .filter(Boolean)
    .map((slug) => ({ locale: "en", slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  return getAboutMetadata(locale, slug);
}

export default async function AboutEnSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return renderAboutPage(locale, slug);
}
