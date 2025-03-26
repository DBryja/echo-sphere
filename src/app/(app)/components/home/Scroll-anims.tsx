"use client";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useWindowWidth } from "@hooks/useWindowWidth";

export default function ScrollAnims(){
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth > 1024;
  // Revolution section
  const revContainerRef = useRef<HTMLDivElement | null>(null);
  const revTitlesRef = useRef<HTMLDivElement[] | null>(null);
  const revDescRef = useRef<HTMLDivElement | null>(null);
  // Headings displacements
  const artistsHeadingRef = useRef<HTMLDivElement | null>(null);
  const releasesTitleRef = useRef<HTMLDivElement | null>(null);
  const concertsWrapperRef = useRef<HTMLDivElement | null>(null);
  const concertsHeadingsRef = useRef<HTMLDivElement[] | null>(null);
  const newsletterRef = useRef<HTMLDivElement | null>(null);

  // Revolution section
  useEffect(() => {
    if (!revContainerRef.current) {
      revContainerRef.current = document.querySelector(
        ".home__revolution",
      ) as HTMLDivElement;
    }
    if (!revTitlesRef.current) {
      revTitlesRef.current = Array.from(document.querySelectorAll(
        ".home__revolution__title.hide-on-sm span",
      )) as HTMLDivElement[];
    }
    if (!revDescRef.current) {
      revDescRef.current = document.querySelector(
        ".home__revolution__desc",
      ) as HTMLDivElement;
    }
  }, []);
  useGSAP(()=>{
    if(!isDesktop){
      gsap.killTweensOf(revContainerRef.current);
      gsap.killTweensOf(revTitlesRef.current);
      gsap.killTweensOf(revDescRef.current);
      return;
    }

    if(!revContainerRef.current || !revTitlesRef.current || !revDescRef.current) return;

    gsap.set(revTitlesRef.current, {
      transformOrigin: "50% 0",
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      rotateX: "-120deg",
      scaleX: 0.9,
      // opacity: 0,
    })
    revTitlesRef.current.forEach(el => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "+=30%",
          scrub: true,
        },
        rotateX: "0deg",
        scaleX: 1,
      })
    })

    gsap.set(revDescRef.current, {
      scale: 0.9,
      opacity: 0,
      yPercent: 50,
    })
    gsap.to(revDescRef.current, {
      scrollTrigger: {
        trigger: revDescRef.current,
        start: "top 85%",
        end: "+=10%",
        scrub: true,
      },
      scale: 1,
      opacity: 1,
      yPercent: 0,
    })


  }, {
      revertOnUpdate: true,
      dependencies: [isDesktop]
    })

  // Headings displacements
  useEffect(() => {
    artistsHeadingRef.current = document.querySelector(".home__artists .artists-carousel__bar h3") as HTMLDivElement;
    releasesTitleRef.current = document.querySelector(".home__releases__title") as HTMLDivElement;
    concertsWrapperRef.current = document.querySelector(".home__events") as HTMLDivElement;
    concertsHeadingsRef.current = Array.from(document.querySelectorAll(".home__events__list h2")) as HTMLDivElement[];
    newsletterRef.current = document.querySelector(".home__newsletter__title") as HTMLDivElement;
    }, []);
  useGSAP(() => {
    if (!isDesktop) {
      const elements = [
        artistsHeadingRef.current,
        releasesTitleRef.current,
        ...(concertsHeadingsRef.current || []),
        newsletterRef.current
      ].filter(Boolean);

      elements.forEach(el => gsap.killTweensOf(el));
      return;
    }

    const createScrollTrigger = (trigger : HTMLDivElement | string) => ({
      trigger,
      start: "top 70%",
      end: () => "+=" + window.innerHeight * 0.6,
      scrub: 1,
      // once: true,
    });

    const createAnimation = (
      element:HTMLDivElement | string,
      animation: gsap.AnimationVars,
      customTrigger: HTMLDivElement | string | null = null) => {
      if (!element) return;

      gsap.from(element, {
        scrollTrigger: createScrollTrigger(customTrigger || element),
        ...animation
      });
    };


    if(artistsHeadingRef.current) {
      createAnimation(artistsHeadingRef.current, { x: 200 });
    }
    if(releasesTitleRef.current){
      createAnimation(releasesTitleRef.current, { y: 50 });
    }

    if (concertsWrapperRef.current && concertsHeadingsRef.current) {
      concertsHeadingsRef.current.forEach((el, i) => {
        createAnimation(el, {
          x: 200 * (i % 2 === 1 ? -1 : 1),
          delay: i * 0.1
        }, concertsWrapperRef.current);
      });
    }

    if(newsletterRef.current) {
      createAnimation(newsletterRef.current, { x: 200 });
    }

  }, {
    revertOnUpdate: true,
    dependencies: [isDesktop]
  });

  return <></>
}