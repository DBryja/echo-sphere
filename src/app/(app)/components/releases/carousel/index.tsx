"use client";
import React, {useState, useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import type {Swiper as SwiperType} from "swiper"
import debounce from 'lodash/debounce';
import {EffectCoverflow} from "swiper/modules";
import {ISlide} from "@app/(pages)/releases/page";
import gsap from "gsap";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import Icon, {Socials} from "@components/shared/socialIcon";

export default function Carousel({slides, gap, spv}: {slides: ISlide[], gap: number, spv:number}){
    const [currentSlide, setCurrentSlide] = useState<ISlide | null>(null);

    useEffect(() => {
        if (slides.length > 0) {
            setCurrentSlide(slides[0]);
        }
    }, [slides]);

    useEffect(() => {
        if (currentSlide) {
            gsap.fromTo(".carousel__bar__name", { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.3 });
        }
    }, [currentSlide]);

    return <>
        <Swiper
            slidesPerView={spv}
            spaceBetween={gap}
            onSlideChange={debounce((swiper: SwiperType) => setCurrentSlide(slides[swiper.realIndex]), 100)}
            centeredSlides={true}
            effect={"coverflow"}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 400,
                modifier: 1,
                slideShadows: false
            }}
            loop={true}
            pagination={false}
            modules={[EffectCoverflow]}
            className={"carousel-container"}
        >
            {slides.map((slide, i) => (
                <SwiperSlide key={i}>
                    {slide.cover}
                </SwiperSlide>
            ))}
        </Swiper>
        <div className={"carousel__bar"}>
            {currentSlide && (
                <>
                    <div className={"carousel__bar__name"}>{currentSlide.title}</div>
                    <div className={"carousel__bar__icons"}>
                        {currentSlide.links && Object.entries(currentSlide.links).map(([key, value]) => (
                            value && <Icon href={value} social={key as Socials} key={key} red/>
                        ))}
                    </div>
                </>
            )}
        </div>
    </>
}