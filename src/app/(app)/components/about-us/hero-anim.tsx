"use client";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useWindowWidth } from "@hooks/useWindowWidth";
import SplitType from "split-type";

export default function HeroAnim() {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const extraRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useWindowWidth() > 1279;

  // Set up references to the DOM elements
  useEffect(() => {
    if (!bannerRef.current) {
      bannerRef.current = document.querySelector(
        ".about-us__hero__bg",
      ) as HTMLDivElement;
    }
    if (!titleRef.current) {
      titleRef.current = document.querySelector(
        ".about-us__hero__heading",
      ) as HTMLDivElement;
    }
    if (!extraRef.current) {
      extraRef.current = document.querySelector(
        ".about-us__hero__extra",
      ) as HTMLDivElement;
    }
    if (!descRef.current) {
      descRef.current = document.querySelector(
        ".about-us__hero__desc",
      ) as HTMLDivElement;
    }

    if (descRef.current) new SplitType(descRef.current, { types: "lines" });
  }, []);

  useGSAP(() => {
    // Clean up for mobile
    if (!isDesktop) {
      gsap.killTweensOf(bannerRef.current);
      gsap.killTweensOf(titleRef.current);
      gsap.killTweensOf(extraRef.current);
      gsap.killTweensOf(descRef.current);
      return;
    }

    if (
      !bannerRef.current ||
      !titleRef.current ||
      !extraRef.current ||
      !descRef.current
    )
      return;

    const tlMaskAnimLength =  (window.innerHeight * 3.5).toString();
    const tlMaskAnim = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-us__hero",
        pin: ".about-us__hero",
        start: "top top",
        end: () => "+=" + tlMaskAnimLength,
        scrub: 1,
        // markers: true,
      },
    });
    // prettier-ignore
    tlMaskAnim
      .to(extraRef.current, {
        y: 300,
        scale: 0.5,
        opacity: 0,
      })
      .to(bannerRef.current, {
        "--mask-size": "200vw",
        '--mask-x': "46.3%",
      }, "<")
      .to(bannerRef.current, {
        "--mask-size": "500vw",
        "--opacity": 0.95,
      })
      .to(bannerRef.current, {
        "--mask-size": "1500vw",
        "--opacity": 0.65,
      })
      .to(bannerRef.current, {
        "--mask-size": "3000vw",
        "--opacity": 0.3,
      })
      .to(bannerRef.current, {
        "--mask-size": "4500vw",
        "--opacity": 0,
      })
      .to(descRef.current, {
        opacity: 1
      })
      .to(".about-us__hero__desc .line", {
        "--inset-r": "0%",
        stagger: 0.32,
      })
      .to(descRef.current, {})
  }, [
    bannerRef.current,
    titleRef.current,
    extraRef.current,
    descRef.current,
    isDesktop,
  ]);

  return <></>;
}
