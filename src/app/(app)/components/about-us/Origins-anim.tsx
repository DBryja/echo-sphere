"use client";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useWindowWidth } from "@hooks/useWindowWidth";

export default function HeroAnim() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const img1Ref = useRef<HTMLDivElement | null>(null);
  const img2Ref = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth > 1024;

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
      containerRef.current?.setAttribute("style", "");
      img1Ref.current?.setAttribute("style", "");
      img2Ref.current?.setAttribute("style", "");
      return;
    }

    if (!containerRef.current || !img1Ref.current || !img2Ref.current) return;
    tlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "+=40%",
        scrub: 1,
        once: true,
      },
    });
    tlRef.current.from(img1Ref.current,
      { x: "20%", y: ()=>window.innerHeight*0.2, rotate: "30deg", ease: "sine.in" }
    );
    tlRef.current.from(img2Ref.current,
      { x: "-20%", y: ()=>window.innerHeight*0.2, rotate: "-30deg", ease: "sine.in" },
      "<");
  }, {
    revertOnUpdate: true,
    dependencies: [isDesktop]
  });

  return <></>;
}
