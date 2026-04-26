import "./../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientEnhancements from "@/components/ClientEnhancements";

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
        <div className="se-pre-con"></div>

        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
        <ClientEnhancements />
      </body>
    </html>
  );
}
