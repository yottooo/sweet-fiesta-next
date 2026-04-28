"use client";

import { useEffect, useState } from "react";

type SlideContent = {
  image: string;
  title: string;
  subtitle: string;
  buttontittle?: string | null;
  buttonlink?: string | null;
};

type HeroCarouselProps = {
  slides: Array<{
    id: string;
    content: SlideContent;
  }>;
  previousLabel: string;
  nextLabel: string;
};

export default function HeroCarousel({
  slides,
  previousLabel,
  nextLabel,
}: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [slides.length]);

  const showPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
  };

  return (
    <div className="hero-carousel">
      <div className="hero-carousel-track transparent-nav heading-uppercase text-dark">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={slide.id}
              className={`item hero-slide bg-cover ${isActive ? "is-active" : ""}`}
              aria-hidden={!isActive}
              style={{ backgroundImage: `url(/uploads/images/homepage_slider_images/${slide.content.image})` }}
            >
              <div className="box-table shadow dark">
                <div className="box-cell">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12 col-xs-12">
                        <div className="content">
                          <h2>{slide.content.title}</h2>
                          <h1>{slide.content.subtitle}</h1>
                          {slide.content.buttontittle && slide.content.buttonlink && (
                            <a href={slide.content.buttonlink} className="btn btn-light border btn-md">
                              {slide.content.buttontittle}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="left carousel-control"
            aria-label={previousLabel}
            onClick={showPrevious}
          >
            <i className="fa fa-angle-left"></i>
            <span className="sr-only">{previousLabel}</span>
          </button>
          <button
            type="button"
            className="right carousel-control"
            aria-label={nextLabel}
            onClick={showNext}
          >
            <i className="fa fa-angle-right"></i>
            <span className="sr-only">{nextLabel}</span>
          </button>
        </>
      )}
    </div>
  );
}
