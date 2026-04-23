import { getMessages } from "@/lib/i18n";
import Link from "next/link";
import contactData from "@/data/contact_us.json";

export default function Footer({ locale }: { locale: string }) {
  const i18n = getMessages(locale);
  const contact = (contactData as any[])[0].translations[locale];

  return (
    <footer className="bg-dark text-light">
      <div className="container">
        <div className="row">
          <div className="f-items default-padding">
            <div className="col-md-4 item">
              <div className="f-item about">
                <img src="/images/static/logo.png" alt="Logo" style={{maxHeight: '40px', marginBottom: '20px'}} />
                <p>{contact.footer_text}</p>
                <ul>
                  {contact.facebook && (
                    <li><a href={contact.facebook}><i className="fa fa-facebook"></i></a></li>
                  )}
                  {contact.youtube && (
                    <li><a href={contact.youtube}><i className="fa fa-youtube"></i></a></li>
                  )}
                  {contact.linkedin && (
                    <li><a href={contact.linkedin}><i className="fa fa-linkedin"></i></a></li>
                  )}
                </ul>
              </div>
            </div>
            <div className="col-md-4 item">
              <div className="f-item address">
                <h4>{i18n['Контакти'] || 'Contacts'}</h4>
                <ul>
                  <li>
                    <i className="fa fa-envelope"></i> 
                    <p><span>{i18n['Имейл'] || 'Email'}</span> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                  </li>
                  <li>
                    <i className="fa fa-phone"></i> 
                    <p><span>{i18n['Телефон'] || 'Phone'}</span> {contact.phone}</p>
                  </li>
                  <li>
                    <i className="fa fa-map-marker"></i> 
                    <p><span>{i18n['Адрес'] || 'Address'}</span> {contact.address}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-4 item">
              <div className="f-item link">
                <h4>{i18n['Продукти'] || 'Products'}</h4>
                <ul>
                  <li><Link href={`/${locale}/products`}>{i18n['Кувертюри'] || 'Couvertures'}</Link></li>
                  <li><Link href={`/${locale}/products`}>{i18n['Кремове'] || 'Creams'}</Link></li>
                  <li><Link href={`/${locale}/blog`}>{i18n['Блог'] || 'Blog'}</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Start Footer Bottom */}
      <div className="footer-bottom bg-dark-hard text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>&copy; {new Date().getFullYear()} {i18n['Сладка Фиеста'] || 'Sweet Fiesta'}. {i18n['Всички права запазени от'] || 'All Rights Reserved by'} <span>{i18n['Сладка Фиеста'] || 'Sweet Fiesta'}</span></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
