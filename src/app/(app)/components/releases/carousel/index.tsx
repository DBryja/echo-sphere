"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import debounce from "lodash/debounce";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { ISlide } from "@app/(pages)/releases/page";
import gsap from "gsap";

import "swiper/css";
import "swiper/css/effect-coverflow";
import Icon, { Socials } from "@components/shared/socialIcon";

export default function Carousel({ slides }: { slides: ISlide[] }) {
  const [currentSlide, setCurrentSlide] = useState<ISlide | null>(null);
  const [firstSwipe, setFirstSwipe] = useState<boolean>(true);

  useEffect(() => {
    if (slides.length > 0) {
      setCurrentSlide(slides[0]);
    }
  }, [slides]);

  useEffect(() => {
    if (currentSlide) {
      gsap.fromTo(
        ".carousel__bar__name",
        { opacity: 0, x: -5, y: 5, skewX: 5, transformOrigin: "bottom" },
        { opacity: 1, x: 5, y: 0, skewX: 0, duration: 0.5 },
      );
    }
  }, [currentSlide]);

  useEffect(() => {
    if (firstSwipe) return;
    gsap.to(".releases__carousel__info", {
      opacity: 0,
      duration: 0.5,
    });
  }, [firstSwipe]);

  return (
    <>
      <Swiper
        onSlideChange={debounce(
          (swiper: SwiperType) => setCurrentSlide(slides[swiper.realIndex]),
          100,
        )}
        centeredSlides={true}
        effect={"coverflow"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 400,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.5,
            spaceBetween: 64,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 96,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 128,
          },
          1440: {
            slidesPerView: 2,
            spaceBetween: 180,
          },
          1600: {
            slidesPerView: 2.3,
            spaceBetween: 264,
          },
        }}
        loop={true}
        pagination={false}
        // navigation={{
        //   nextEl: ".nav-btn--next",
        //   prevEl: ".nav-btn--prev",
        // }}
        slideToClickedSlide={true}
        speed={500}
        grabCursor={true}
        modules={[EffectCoverflow, Navigation]}
        onSlideChangeTransitionEnd={(swiper) => {
          if (firstSwipe && swiper.realIndex !== 0) setFirstSwipe(false);
        }}
        className={"carousel-container carousel-container--releases"}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>{slide.cover}</SwiperSlide>
        ))}
      </Swiper>
      <div className={"carousel__bar"}>
        {currentSlide && (
          <>
            <div className={"carousel__bar__name"}>{currentSlide.title}</div>
            <div className={"carousel__bar__icons"}>
              {currentSlide.links &&
                Object.entries(currentSlide.links).map(
                  ([key, value]) =>
                    value && (
                      <Icon
                        href={value}
                        social={key as Socials}
                        key={key}
                        red
                      />
                    ),
                )}
            </div>
          </>
        )}
      </div>
      {/*<div className={"carousel__navigation"}>*/}
      {/*  <button className={"nav-btn nav-btn--prev"}>👈</button>*/}
      {/*  <button className={"nav-btn nav-btn--next"}>👉</button>*/}
      {/*</div>*/}
    </>
  );
}
