"use client";

import Link from "next/link";
import { useState } from "react";
import aboutData from "@/data/about_us.json";
import contactData from "@/data/contact_us.json";
import { getMessages } from "@/lib/i18n";
import {
  AboutEntry,
  ContactEntry,
  getAboutPath,
  getContactsPath,
  getLocalizedTranslation,
} from "@/lib/site";

export default function Header({ locale }: { locale: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const i18n = getMessages(locale);
  const contact = getLocalizedTranslation((contactData as ContactEntry[])[0], locale);
  const aboutTranslation = getLocalizedTranslation((aboutData as AboutEntry[])[0], locale);
  const aboutPath = getAboutPath(locale, aboutTranslation.slug);
  const contactsPath = getContactsPath(locale);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="top-bar-area inline bg-theme">
        <div className="container">
          <div className="row">
            <div className="col-md-8 address-info text-left">
              <div className="info box">
                <ul>
                  {contact.email ? (
                    <li>
                      <i className="fas fa-envelope-open "></i> 
                      <a href={`mailto:${contact.email}`}
                      style={{ color: "white", textDecoration: "none" }}>{contact.email}
                      </a>
                    </li>
                  ) : null}
                  {contact.phone ? (
                    <li>
                      <i className="fas fa-phone"></i> 
                      <a href="tel:+359888733606" style={{ color: "white", textDecoration: "none" }}>
                        {contact.phone}
                        </a>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>

      <header id="home">
        <nav className="navbar navbar-default navbar-fixed dark no-background bootsnav inc-border active-border">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className={`navbar-toggle ${menuOpen ? "" : "collapsed"}`}
                aria-expanded={menuOpen}
                aria-controls="navbar-menu"
                onClick={() => setMenuOpen((isOpen) => !isOpen)}
              >
                <i className="fa fa-bars"></i>
              </button>
              <Link className="navbar-brand" href={`/${locale}`} onClick={closeMenu}>
                <img src="/images/static/logo.png" className="logo" alt="SweetFiesta" title="SweetFiesta" />
              </Link>
            </div>

            <div className={`collapse navbar-collapse ${menuOpen ? "in" : ""}`} id="navbar-menu">
              <ul className="nav navbar-nav navbar-right" data-in="#" data-out="#">
                <li>
                  <Link href={`/${locale}`} onClick={closeMenu}>
                    {i18n["Начало"] || "Home"}
                  </Link>
                </li>
                <li>
                  <Link href={aboutPath} onClick={closeMenu}>
                    {i18n["За нас"] || "About Us"}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/products`} onClick={closeMenu}>
                    {i18n["Продукти"] || "Products"}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/blog`} onClick={closeMenu}>
                    {i18n["Блог"] || "Blog"}
                  </Link>
                </li>
                <li>
                  <Link href={contactsPath} onClick={closeMenu}>
                    {i18n["Контакти"] || "Contacts"}
                  </Link>
                </li>

                <li className="nav-icon nav-langs">
                  <Link
                    href="/bg"
                    className={`text-center ${locale === "bg" ? "sellang" : ""}`}
                    onClick={closeMenu}
                  >
                    <img src="/images/static/bg.png" alt="БГ" />
                    <div>БГ</div>
                  </Link>
                  <Link
                    href="/en"
                    className={`text-center ${locale === "en" ? "sellang" : ""}`}
                    onClick={closeMenu}
                  >
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
