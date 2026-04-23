import { getMessages } from "@/lib/i18n";
import Link from "next/link";
import contactData from "@/data/contact_us.json";

export default function Header({ locale }: { locale: string }) {
  const i18n = getMessages(locale);
  const contact = (contactData as any[])[0].translations[locale];

  return (
    <header id="home">
      {/* Start Navigation */}
      <nav className="navbar navbar-default attr-border navbar-sticky bootsnav">
        <div className="container">
          <div className="row">
            <div className="top-search">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-search"></i></span>
                <input type="text" className="form-control" placeholder="Search" />
                <span className="input-group-addon close-search"><i className="fa fa-times"></i></span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
              <i className="fa fa-bars"></i>
            </button>
            <Link className="navbar-brand" href={`/${locale}`}>
              <img src="/images/static/logo.png" className="logo" alt="Logo" style={{maxHeight: '50px'}} />
            </Link>
          </div>

          <div className="collapse navbar-collapse" id="navbar-menu">
            <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
              <li>
                <Link href={`/${locale}`}>{i18n['Начало'] || 'Home'}</Link>
              </li>
              <li>
                <Link href={`/${locale}/about`}>{i18n['За нас'] || 'About Us'}</Link>
              </li>
              <li>
                <Link href={`/${locale}/products`}>{i18n['Продукти'] || 'Products'}</Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`}>{i18n['Блог'] || 'Blog'}</Link>
              </li>
              <li>
                <Link href={`/${locale}/contacts`}>{i18n['Контакти'] || 'Contacts'}</Link>
              </li>
              
              {/* Locale Switcher */}
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  {locale === 'bg' ? 'BG' : 'EN'}
                </a>
                <ul className="dropdown-menu">
                  <li><Link href="/bg">Български</Link></li>
                  <li><Link href="/en">English</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
