import type { Metadata } from "next";
import "./globals.css";
import { getMessages } from "@/lib/i18n";

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'bg' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i18n = getMessages(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/css/flaticon-set.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/bootsnav.css" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/responsive.css" />
      </head>
      <body>
        {children}
        <script src="/js/jquery-1.12.4.min.js" defer></script>
        <script src="/js/bootstrap.min.js" defer></script>
        <script src="/js/equal-height.min.js" defer></script>
        <script src="/js/jquery.appear.js" defer></script>
        <script src="/js/jquery.easing.min.js" defer></script>
        <script src="/js/jquery.magnific-popup.min.js" defer></script>
        <script src="/js/modernizr.custom.13711.js" defer></script>
        <script src="/js/owl.carousel.min.js" defer></script>
        <script src="/js/wow.min.js" defer></script>
        <script src="/js/isotope.pkgd.min.js" defer></script>
        <script src="/js/imagesloaded.pkgd.min.js" defer></script>
        <script src="/js/count-to.js" defer></script>
        <script src="/js/bootsnav.js" defer></script>
        <script src="/js/main.js" defer></script>
      </body>
    </html>
  );
}
