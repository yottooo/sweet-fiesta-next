import type { Metadata } from "next";
import contactData from "@/data/contact_us.json";
import { getLocalizedTranslation } from "@/lib/site";
import {
  JsonLd,
  breadcrumbJsonLd,
  createSeoMetadata,
  getHomePath,
  getLocalizedContactsPath,
  organizationJsonLd,
} from "@/lib/seo";

type ContactTranslation = {
  title: string;
  description?: string | null;
  phone?: string | null;
  phone_1?: string | null;
  phone_2?: string | null;
  phone_3?: string | null;
  phone_4?: string | null;
  email?: string | null;
  email_1?: string | null;
  email_2?: string | null;
  email_3?: string | null;
  email_4?: string | null;
  address?: string | null;
  image?: string | null;
  seo_title?: string;
  seo_description?: string;
};

type ContactEntry = {
  id: string;
  translations: Record<string, ContactTranslation>;
};

function getLabels(locale: string) {
  if (locale === "bg") {
    return {
      home: "Начало",
      contacts: "Контакти",
      address: "Адрес",
      phones: "Телефони",
      emails: "Имейли",
      info: "Свържете се с нас",
    };
  }

  return {
    home: "Home",
    contacts: "Contacts",
    address: "Address",
    phones: "Phones",
    emails: "Emails",
    info: "Contact us",
  };
}

function compactValues(values: Array<string | null | undefined>) {
  return values.filter((value): value is string => Boolean(value && value.trim()));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const contactEntry = (contactData as ContactEntry[])[0];
  const translation = getLocalizedTranslation(contactEntry, locale);

  return createSeoMetadata({
    title: translation.seo_title || translation.title,
    description: translation.seo_description || translation.title,
    path: getLocalizedContactsPath(locale),
    alternatePaths: {
      bg: getLocalizedContactsPath("bg"),
      en: getLocalizedContactsPath("en"),
    },
    image: translation.image
      ? `/uploads/images/contact_image/${translation.image}`
      : undefined,
    locale,
  });
}

export default async function ContactsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const labels = getLabels(locale);
  const contactEntry = (contactData as ContactEntry[])[0];
  const translation = getLocalizedTranslation(contactEntry, locale);
  const phones = compactValues([
    translation.phone,
    translation.phone_1,
    translation.phone_2,
    translation.phone_3,
    translation.phone_4,
  ]);
  const emails = compactValues([
    translation.email,
    translation.email_1,
    translation.email_2,
    translation.email_3,
    translation.email_4,
  ]);

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: labels.home, path: getHomePath(locale) },
          { name: labels.contacts, path: getLocalizedContactsPath(locale) },
        ])}
      />
      <JsonLd data={organizationJsonLd()} />
      <div
        className="breadcrumb-area shadow text-center dark bg-fixed text-light"
        style={{
          backgroundImage: `url(${
            translation.image
              ? `/uploads/images/contact_image/${translation.image}`
              : "/images/static/2440x1578.png"
          })`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>{labels.contacts}</h1>
              <ul className="breadcrumb">
                <li>
                  <a href={`/${locale}`}>
                    <i className="fas fa-home"></i> {labels.home}
                  </a>
                </li>
                <li className="active">{labels.contacts}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-us-area default-padding">
        <div className="container">
          <div className="row">
            <div className="contact-box">
              <div className="col-md-10 col-md-offset-1 info text-center">
                <h2>{translation.title || labels.info}</h2>
                {translation.description ? (
                  <div dangerouslySetInnerHTML={{ __html: translation.description }} />
                ) : null}

                <div className="address-items">
                  <div className="row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
                    {translation.address ? (
                      <div className="col-lg-3 col-md-4 col-sm-6 equal-height">
                        <div className="item">
                          <div className="icon">
                            <i className="fas fa-map-marked-alt"></i>
                          </div>
                          <span>{translation.address}</span>
                        </div>
                      </div>
                    ) : null}
                    {phones.map((phone) => (
                      <div key={phone} className="col-lg-3 col-md-4 col-sm-6 equal-height">
                        <div className="item">
                          <div className="icon">
                            <i className="fas fa-phone"></i>
                          </div>
                          <span>
                            <a href={`tel:${phone.replace(/\s+/g, '')}`}>
                              {phone}
                            </a>
                          </span>
                        </div>
                      </div>
                    ))}
                    {emails.map((email) => (
                      <div key={email} className="col-lg-3 col-md-4 col-sm-6 equal-height">
                        <div className="item">
                          <div className="icon">
                            <i className="fas fa-envelope-open"></i>
                          </div>
                          <span>
                            <a href={`mailto:${email}`}>
                              {email}
                            </a>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="maps-area">
        <div className="container-full">
          <div className="row">
            <div className="google-maps">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1475.8470825509598!2d24.775800470655753!3d42.19055522275963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14acd3daaca3ada3%3A0xac86d09a83e15293!2sSweet+Fiesta!5e0!3m2!1sen!2sbg!4v1563439776325!5m2!1sen!2sbg"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
