import sliderData from "@/data/homepage_slider.json";
import homeData from "@/data/home.json";
import { getMessages } from "@/lib/i18n";
import Link from "next/link";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const i18n = getMessages(locale);
  
  // Cast data to any for easier access in this prototype, 
  // though in a real project we'd use proper TypeScript interfaces.
  const sliders = sliderData as any[];
  const home = (homeData as any[])[0];
  const content = home.translations[locale] || home.translations['en'];

  return (
    <main>
      {/* Main Slider Section */}
      <div className="banner-area">
        <div id="boot-carousel" className="carousel slide carousel-fade animate_text" data-ride="carousel">
          <div className="carousel-inner">
            {sliders.map((slider, index) => {
              const slideContent = slider.translations[locale] || slider.translations['en'];
              return (
                <div key={slider.id} className={`item ${index === 0 ? 'active' : ''}`}>
                  <div 
                    className="slider-content bg-fixed" 
                    style={{ backgroundImage: `url(/uploads/images/homepage_slider_images/${slideContent.image})` }}
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col-md-8 col-sm-12">
                          <div className="content">
                            <h2 className="animated fadeInUp">{slideContent.title}</h2>
                            <p className="animated fadeInDown">{slideContent.subtitle}</p>
                            <Link href={slideContent.buttonlink} className="btn btn-theme effect btn-md animated fadeInUp">
                              {slideContent.buttontittle}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <a className="left carousel-control" href="#boot-carousel" data-slide="prev">
            <i className="fa fa-angle-left"></i>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#boot-carousel" data-slide="next">
            <i className="fa fa-angle-right"></i>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      {/* About Section */}
      <div className="about-area default-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6 about-items">
              <div className="about-info">
                <h2>{content.title}</h2>
                <blockquote>{content.subtitle}</blockquote>
                <div dangerouslySetInnerHTML={{ __html: content.description }} />
              </div>
            </div>
            <div className="col-md-6 about-items">
              <div className="thumb">
                <img src={`/uploads/images/homepage_slider_images/${content.image}`} alt={content.image_alt} title={content.image_title} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Section (Highlights) */}
      <div className="banner-area-2 bg-gray default-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-30">
              <div className="item">
                <div className="thumb">
                  <img src={`/uploads/images/homepage_slider_images/${content.image_banner1}`} alt={content.image_alt_banner1} />
                  <div className="overlay">
                    <div className="content">
                      <h4>{content.image_title_banner1}</h4>
                      <Link href={content.link_banner1} className="btn btn-theme effect btn-sm">
                        {i18n['ВИЖ ОЩЕ'] || 'SEE MORE'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-30">
              <div className="item">
                <div className="thumb">
                  <img src={`/uploads/images/homepage_slider_images/${content.image_banner2}`} alt={content.image_alt_banner2} />
                  <div className="overlay">
                    <div className="content">
                      <h4>{content.image_title_banner2}</h4>
                      <Link href={content.link_banner2} className="btn btn-theme effect btn-sm">
                        {i18n['ВИЖ ОЩЕ'] || 'SEE MORE'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
