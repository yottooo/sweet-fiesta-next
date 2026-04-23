import { getMessages } from "@/lib/i18n";
import Link from "next/link";
import contactData from "@/data/contact_us.json";

export default function Header({ locale }: { locale: string }) {
  const i18n = getMessages(locale);
  const contact = (contactData as any[])[0].translations[locale];

  return (
    <>
      <div className="top-bar-area inline bg-theme">
        <div className="container">
          <div className="row">
            <div className="col-md-8 address-info text-left">
              <div className="info box">
                <ul>
                  {contact.email && (
                    <li>
                      <i className="fas fa-envelope-open"></i> {contact.email}
                    </li>
                  )}
                  {contact.phone && (
                    <li>
                      <i className="fas fa-phone"></i> {contact.phone}
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-md-4 social text-right">
              <ul>
                {contact.facebook && (
                  <li>
                    <a href={contact.facebook} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                )}
                {contact.youtube && (
                  <li>
                    <a href={contact.youtube} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-youtube"></i>
                    </a>
                  </li>
                )}
                {contact.linkedin && (
                  <li>
                    <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <header id="home">
        <nav className="navbar navbar-default navbar-fixed dark no-background bootsnav inc-border active-border">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                <i className="fa fa-bars"></i>
              </button>
              <Link className="navbar-brand" href={`/${locale}`}>
                <img src="/images/static/logo.png" className="logo" alt="SweetFiesta" title="SweetFiesta" />
              </Link>
            </div>

            <div className="collapse navbar-collapse" id="navbar-menu">
              <ul className="nav navbar-nav navbar-right" data-in="#" data-out="#">
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

                <li className="nav-icon nav-langs">
                  <Link href="/bg" className={`text-center ${locale === 'bg' ? 'sellang' : ''}`}>
                    <img src="/images/static/bg.png" alt="БГР" />
                    <div>БГР</div>
                  </Link>
                  <Link href="/en" className={`text-center ${locale === 'en' ? 'sellang' : ''}`}>
                    <img src="/images/static/gb.png" alt="ENG" />
                    <div>ENG</div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
