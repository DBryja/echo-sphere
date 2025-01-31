"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function HideLogoAnim() {
  const triggerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.to(".header > a", {
      scrollTrigger: {
        trigger: ".hide-logo-trigger",
        start: "top top",
        end: "+=80",
        scrub: true,
        markers: true,
      },
      y: -25,
      opacity: 0,
      scaleY: 0.9,
      skewX: 5,
      zIndex: 100,
    });
  }, []);

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
