import { notFound } from "next/navigation";
import BaseContactsPage, { generateMetadata as generateBaseMetadata } from "../contacts/page";

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return generateBaseMetadata({ params });
}

export default async function EnContactsAliasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== "en") {
    notFound();
  }

  return BaseContactsPage({ params: Promise.resolve({ locale }) });
}
