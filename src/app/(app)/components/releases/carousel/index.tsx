"use client";
import React, {useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import type {Swiper as SwiperType} from "swiper"
import debounce from 'lodash/debounce';
import {EffectCoverflow} from "swiper/modules";
import {ISlide} from "@app/(pages)/releases/page";

import 'swiper/css';
import 'swiper/css/effect-coverflow';

export default function Carousel({slides, gap}: {slides: ISlide[], gap: number}){
    const [currentSlide, setCurrentSlide] = useState(0);
    return <>
        <Swiper
            slidesPerView={3}
            spaceBetween={gap}
            onSlideChange={debounce((swiper: SwiperType) => setCurrentSlide(swiper.realIndex), 100)}
            centeredSlides={true}
            effect={"coverflow"}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: false
            }}
            loop={true}
            pagination={false}
            modules={[EffectCoverflow]}
            className={"carousel-container"}
        >
            {slides.map((slide, i)=>(
                <SwiperSlide key={i}>
                    {slide.cover}
                </SwiperSlide>
            ))}
    </Swiper>
        {/*<div className={"carousel__bar"}></div>*/}
        </>
}