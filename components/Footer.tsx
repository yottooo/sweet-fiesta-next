import { getMessages } from "@/lib/i18n";
import contactData from "@/data/contact_us.json";
import imageData from "@/data/images.json";

export default function Footer({ locale }: { locale: string }) {
  const i18n = getMessages(locale);
  const contact = (contactData as any[])[0].translations[locale];
  const footerGallery = (imageData as any[]).filter(img => img.gallery_id === "3").slice(0, 6);

  return (
    <footer className="bg-dark">
      <div className="container">
        <div className="row">
          <div className="f-items col-4 title-effect text-light default-padding">
            
            {/* Column 1: Address */}
            <div className="col-md-3 col-sm-6 equal-height item">
              <div className="f-item address">
                <img src="/images/static/logo.png" alt="Logo" />
                <p>{contact.address}</p>
                <ul>
                  <li>
                    <span>{i18n['Телефон'] || 'Phone'}: </span> {contact.phone}
                  </li>
                  <li>
                    <span>{i18n['Имейл'] || 'Email'}: </span> 
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 2: About Us */}
            <div className="col-md-3 col-sm-6 equal-height item">
              <div className="f-item link">
                <h4>{i18n['За нас'] || 'About Us'}</h4>
                <p>{contact.footer_text}</p>
              </div>
            </div>

            {/* Column 3: Gallery */}
            <div className="col-md-3 col-sm-6 equal-height item">
              <div className="f-item inst-feed magnific-mix-gallery-footer">
                <h4>{i18n['Галерия'] || 'Gallery'}</h4>
                <ul>
                  {footerGallery.map((img) => {
                    const imgContent = img.translations[locale] || img.translations['en'];
                    return (
                      <li key={img.id}>
                        <a href={`/uploads/images/product_images/${img.image}`} className="item popup-link">
                          <img 
                            src={`/uploads/images/product_images/${img.image}`} 
                            alt={imgContent.image_alt} 
                            title={imgContent.image_title} 
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Column 4: Menu */}
            <div className="col-md-3 col-sm-6 equal-height item">
              <div className="f-item link">
                <h4>{i18n['Сладка Фиеста'] || 'Sweet Fiesta'}</h4>
                <ul>
                  <li><a href={`/${locale}`}>{i18n['Начало'] || 'Home'}</a></li>
                  <li><a href={`/${locale}/about`}>{i18n['За нас'] || 'About Us'}</a></li>
                  <li><a href={`/${locale}/products`}>{i18n['Продукти'] || 'Products'}</a></li>
                  <li><a href={`/${locale}/blog`}>{i18n['Блог'] || 'Blog'}</a></li>
                  <li><a href={`/${locale}/contacts`}>{i18n['Контакти'] || 'Contacts'}</a></li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom bg-dark text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>&copy; {i18n['Авторско право'] || 'Copyright'} {new Date().getFullYear()}. {i18n['Всички права запазени от'] || 'All Rights Reserved by'} <a href={`/${locale}`}>SweetFiesta</a></p>
            </div>
            <div className="col-md-6 text-right link">
              <p>{i18n['Разработен от'] || 'Developed by'} <a href="http://www.vertinity.com/" target="_blank" rel="noopener noreferrer">Vertinity</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
