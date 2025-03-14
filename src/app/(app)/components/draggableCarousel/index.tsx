"use client";
// InfiniteSlider.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { FreeMode } from "swiper/modules";
import "./draggableCarousel.scss";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/free-mode";

interface Slide {
  id: number;
  content: React.ReactNode;
}

export interface DraggableCarouselProps {
  slides: Slide[];
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  loop?: boolean;
  freeMode?: boolean;
  sticky?: boolean;
  className?: string;
  id?: string;
  breakpoints?: {
    [key: number]: { slidesPerView?: number; spaceBetween?: number };
  };
  onSlideChange?: (swiper: SwiperType) => void;
  onSwiper?: (swiper: SwiperType) => void;
}

const DraggableCarousel: React.FC<DraggableCarouselProps> = ({
  slides,
  slidesPerView = "auto",
  spaceBetween = 0,
  loop = true,
  freeMode = true,
  sticky = false,
  className = "",
  id = "",
  breakpoints,
  onSlideChange,
  onSwiper,
}) => {
  if (loop) slides = [...slides, ...slides];

  return (
    <Swiper
      modules={[FreeMode]}
      grabCursor={true}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      loop={loop}
      freeMode={{
        enabled: freeMode,
        sticky: sticky,
      }}
      className={className}
      id={id}
      breakpoints={breakpoints}
      onSlideChange={onSlideChange}
      onSwiper={onSwiper}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={`${slide.id}_${i}`}>{slide.content}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DraggableCarousel;
