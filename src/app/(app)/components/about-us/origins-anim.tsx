"use client";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useWindowWidth } from "@hooks/useWindowWidth";

export default function HeroAnim() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const img1Ref = useRef<HTMLDivElement | null>(null);
  const img2Ref = useRef<HTMLDivElement | null>(null);
  const isDesktop = useWindowWidth() > 1024;

  useEffect(() => {
    if (!containerRef.current) {
      containerRef.current = document.querySelector(
        ".about-us__origins",
      ) as HTMLDivElement;
    }
    if (!img1Ref.current) {
      img1Ref.current = document.querySelector(
        ".about-us__origins__images div:nth-child(1)",
      ) as HTMLDivElement;
    }
    if (!img2Ref.current) {
      img2Ref.current = document.querySelector(
        ".about-us__origins__images div:nth-child(2)",
      ) as HTMLDivElement;
    }
  }, []);

  useGSAP(() => {
    if (!isDesktop) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(containerRef.current);
      gsap.killTweensOf(img1Ref.current);
      gsap.killTweensOf(img2Ref.current);
      return;
    }

    if (!containerRef.current || !img1Ref.current || !img2Ref.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "+=40%",
        scrub: 1,
        once: true,
      },
    });
    // prettier-ignore
    tl.from(img1Ref.current, { x: "20%", y: "20vh", rotate: "30deg", ease: "sine.in" });
    // prettier-ignore
    tl.from(img2Ref.current, { x: "-20%", y: "20vh", rotate: "-30deg", ease: "sine.in" }, "<");
  }, [isDesktop, containerRef.current, img1Ref.current, img2Ref.current]);

  return <></>;
}
