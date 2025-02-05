"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useWindowWidth } from "@hooks/useWindowWidth";

gsap.registerPlugin(ScrollTrigger);
export default function HideLogoAnim() {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<GSAPTimeline | null>(null);
  const isMobile = useWindowWidth() < 768;

  useGSAP(() => {
    if (isMobile) {
      if (tlRef.current) {
        tlRef.current.kill();
        ScrollTrigger.getAll()
          .filter((st) => st.trigger?.matches(".hide-logo-trigger"))
          .forEach((st) => st.kill());
        tlRef.current = null;
      }
      return;
    }

    tlRef.current = gsap.timeline();
    tlRef.current.to(".header > a", {
      scrollTrigger: {
        trigger: ".hide-logo-trigger",
        start: "top top",
        end: "+=80",
        scrub: true,
      },
      y: -25,
      opacity: 0,
      scaleY: 0.9,
      skewX: 5,
      zIndex: 100,
    });
  }, [isMobile]);

  return (
    <span
      className={"hide-logo-trigger"}
      ref={triggerRef}
      style={{
        position: "absolute",
        top: "20px",
        left: "0",
        right: "0",
        height: "1px",
      }}
    ></span>
  );
}
