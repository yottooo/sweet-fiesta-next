import type { Metadata } from "next";
import "./../globals.css";
import { getMessages } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

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

  return (
    <html lang={locale}>
      <head>
        <link rel="shortcut icon" href="/images/static/fav.png" type="image/x-icon" />
        
        {/* Google Fonts */}
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,500,600,700,800" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Dancing+Script:400,700" rel="stylesheet" />

        {/* Stylesheets */}
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
        <link rel="stylesheet" href="/css/site-overrides.css" />
      </head>
      <body>
        {/* Preloader is hidden for now to allow viewing content */}
        <div className="se-pre-con" style={{ display: 'none' }}></div>

        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
        
        {/* Load jQuery first */}
        <Script src="/js/jquery-1.12.4.min.js" strategy="beforeInteractive" />
        
        {/* Load other plugins */}
        <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.matchHeight.js" strategy="afterInteractive" />
        <Script src="/js/equal-height.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.appear.js" strategy="afterInteractive" />
        <Script src="/js/jquery.easing.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/js/modernizr.custom.13711.js" strategy="afterInteractive" />
        <Script src="/js/owl.carousel.min.js" strategy="afterInteractive" />
        <Script src="/js/wow.min.js" strategy="afterInteractive" />
        <Script src="/js/isotope.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/js/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/js/count-to.js" strategy="afterInteractive" />
        <Script src="/js/jquery.nice-select.min.js" strategy="afterInteractive" />
        <Script src="/js/bootsnav.js" strategy="afterInteractive" />
        
        {/* Main logic last */}
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
