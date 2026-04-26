import Link from "next/link";
import aboutData from "@/data/about_us.json";
import contactData from "@/data/contact_us.json";
import imageData from "@/data/images.json";
import { getMessages } from "@/lib/i18n";
import {
  AboutEntry,
  ContactEntry,
  ImageEntry,
  getAboutPath,
  getContactsPath,
  getLocalizedTranslation,
} from "@/lib/site";

export default function Footer({ locale }: { locale: string }) {
  const i18n = getMessages(locale);
  const contact = getLocalizedTranslation((contactData as ContactEntry[])[0], locale);
  const aboutTranslation = getLocalizedTranslation((aboutData as AboutEntry[])[0], locale);
  const footerGallery = (imageData as ImageEntry[])
    .filter((image) => image.gallery_id === "3")
    .slice(0, 6);
  const aboutPath = getAboutPath(locale, aboutTranslation.slug);
  const contactsPath = getContactsPath(locale);

  return (
    <footer className="bg-dark">
      <div className="container">
        <div className="row">
          <div className="f-items col-4 title-effect text-light default-padding">
            <div className="col-md-3 col-sm-6 equal-height item">
              <div className="f-item address">
                <img src="/images/static/logo.png" alt="Logo" />
                <p>{contact.address}</p>
                <ul>
                  <li>
                    <span>{i18n["Телефон"] || "Phone"}: </span>
                    <a href="tel:+359888733606">{contact.phone}</a>
                  </li>
                  <li>
                    <span>{i18n["Имейл"] || "Email"}: </span>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 equal-height item">
              <div className="f-item link">
                <h4>{i18n["За нас"] || "About Us"}</h4>
                <p>{contact.footer_text}</p>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 equal-height item">
              <div className="f-item inst-feed magnific-mix-gallery-footer">
                <h4>{i18n["Галерия"] || "Gallery"}</h4>
                <ul>
                  {footerGallery.map((image) => {
                    const imageContent = getLocalizedTranslation(image, locale);

                    return (
                      <li key={image.id}>
                        <a href={`/uploads/images/about_us_images/${image.image}`} className="item popup-link">
                          <img
                            src={`/uploads/images/about_us_images/${image.image}`}
                            alt={imageContent.image_alt || "Gallery image"}
                            title={imageContent.image_title || "Gallery image"}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="col-md-3 col-sm-6 equal-height item">
              <div className="f-item link">
                <h4>{i18n["Сладка Фиеста"] || "Sweet Fiesta"}</h4>
                <ul>
                  <li>
                    <Link href={`/${locale}`}>{i18n["Начало"] || "Home"}</Link>
                  </li>
                  <li>
                    <Link href={aboutPath}>{i18n["За нас"] || "About Us"}</Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/products`}>{i18n["Продукти"] || "Products"}</Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/blog`}>{i18n["Блог"] || "Blog"}</Link>
                  </li>
                  <li>
                    <Link href={contactsPath}>{i18n["Контакти"] || "Contacts"}</Link>
                  </li>
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
              <p>
                &copy; {i18n["Авторско право"] || "Copyright"} {new Date().getFullYear()}.{" "}
                {i18n["Всички права запазени от"] || "All Rights Reserved by"}{" "}
                <Link href={`/${locale}`}>SweetFiesta</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
