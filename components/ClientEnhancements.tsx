"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    $?: JQueryLike;
    jQuery?: JQueryLike;
    WOW?: new (options: Record<string, unknown>) => { init: () => void };
  }
}

type JQueryLike = {
  (selector: unknown): JQueryCollectionLike;
  fn?: Record<string, unknown>;
};

type JQueryCollectionLike = {
  length: number;
  each: (callback: (this: unknown, index: number, element: unknown) => void) => JQueryCollectionLike;
  on: (events: string, ...args: unknown[]) => JQueryCollectionLike;
  off: (events?: string) => JQueryCollectionLike;
  trigger: (event: string) => JQueryCollectionLike;
  addClass: (className: string) => JQueryCollectionLike;
  removeClass: (className: string) => JQueryCollectionLike;
  hasClass: (className: string) => boolean;
  fadeOut: (speed?: string) => JQueryCollectionLike;
  find: (selector: string) => JQueryCollectionLike;
  data: (key: string) => unknown;
  carousel?: () => JQueryCollectionLike;
  equalHeights?: () => JQueryCollectionLike;
  magnificPopup?: (options?: unknown) => JQueryCollectionLike;
  owlCarousel?: (options?: unknown) => JQueryCollectionLike;
  niceSelect?: () => JQueryCollectionLike;
};

function animateSlideContent($: JQueryLike, elements: JQueryCollectionLike) {
  elements.each(function eachAnimatedElement() {
    const element = $(this);
    const animation = element.data("animation");

    if (typeof animation !== "string" || !animation) {
      return;
    }

    element.addClass(animation).on("webkitAnimationEnd.sf animationend.sf", function onAnimationEnd(this: unknown) {
      $(this).removeClass(animation).off("webkitAnimationEnd.sf animationend.sf");
    });
  });
}

function initCarouselAnimations($: JQueryLike) {
  const banners = $(".animate_text");

  if (!banners.length) {
    return;
  }

  banners.each(function eachBanner() {
    const banner = $(this);
    const firstAnimatedElements = banner.find(".item:first [data-animation ^= 'animated']");

    banner.carousel?.();
    animateSlideContent($, firstAnimatedElements);
    banner.off("slide.bs.carousel.sf").on("slide.bs.carousel.sf", function onSlide(event: unknown) {
      const relatedTarget = (event as { relatedTarget?: unknown }).relatedTarget;
      animateSlideContent($, $(relatedTarget).find("[data-animation ^= 'animated']"));
    });
  });
}

function initMagnificPopups($: JQueryLike) {
  $(".popup-link").each(function eachPopupLink() {
    const link = $(this);

    if (link.data("magnificPopup")) {
      return;
    }

    link.magnificPopup?.({ type: "image" });
  });
}

function initEqualHeights($: JQueryLike) {
  $(".equal-height").equalHeights?.();
}

function initNiceSelect($: JQueryLike) {
  $("select").each(function eachSelect() {
    const select = $(this);

    if (select.hasClass("nice-select")) {
      return;
    }

    select.niceSelect?.();
  });
}

function initCarousels($: JQueryLike) {
  $(".content-carousel").each(function initContentCarousel() {
    const carousel = $(this);
    if (!carousel.hasClass("owl-loaded")) {
      carousel.owlCarousel?.({
        loop: false,
        nav: false,
        dots: true,
        items: 1,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
      });
    }
  });

  $(".offer-carousel").each(function initOfferCarousel() {
    const carousel = $(this);
    if (!carousel.hasClass("owl-loaded")) {
      carousel.owlCarousel?.({
        loop: false,
        nav: true,
        dots: false,
        items: 1,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
      });
    }
  });

  $(".services-carousel").each(function initServicesCarousel() {
    const carousel = $(this);
    if (!carousel.hasClass("owl-loaded")) {
      carousel.owlCarousel?.({
        loop: false,
        margin: 15,
        nav: true,
        dots: false,
        autoplay: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 3 },
        },
      });
    }
  });

  $(".testimonials-carousel").each(function initTestimonialsCarousel() {
    const carousel = $(this);
    if (!carousel.hasClass("owl-loaded")) {
      carousel.owlCarousel?.({
        loop: false,
        margin: 30,
        nav: false,
        dots: true,
        autoplay: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 2 },
        },
      });
    }
  });

  $(".food-menu-carousel").each(function initFoodCarousel() {
    const carousel = $(this);
    if (!carousel.hasClass("owl-loaded")) {
      carousel.owlCarousel?.({
        loop: false,
        margin: 30,
        nav: false,
        dots: true,
        autoplay: true,
        navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 3 },
        },
      });
    }
  });
}

function initWow(windowObject: Window) {
  if (!windowObject.WOW) {
    return;
  }

  new windowObject.WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 0,
    mobile: true,
    live: false,
  }).init();
}

export default function ClientEnhancements() {
  const pathname = usePathname();

  useEffect(() => {
    const windowObject = window;
    const $ = windowObject.jQuery ?? windowObject.$;

    if (!$) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      $(".se-pre-con").fadeOut("slow");
      initWow(windowObject);
      initCarouselAnimations($);
      initEqualHeights($);
      initMagnificPopups($);
      initCarousels($);
      initNiceSelect($);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
