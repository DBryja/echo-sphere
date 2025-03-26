"use client";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useWindowWidth } from "@hooks/useWindowWidth";

export default function StudioAnim() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const roomRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);
  const peopleRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useWindowWidth() > 1279;

  useEffect(() => {
    if (!wrapperRef.current) {
      wrapperRef.current = document.querySelector(
        ".about-us__studio__banner",
      ) as HTMLDivElement;
    }
    if (!roomRef.current) {
      roomRef.current = document.querySelector(
        ".about-us__studio__banner .room",
      ) as HTMLDivElement;
    }
    if (!workRef.current) {
      workRef.current = document.querySelector(
        ".about-us__studio__banner .work",
      ) as HTMLDivElement;
    }
    if (!peopleRef.current) {
      peopleRef.current = document.querySelector(
        ".about-us__studio__banner .people",
      ) as HTMLDivElement;
    }
    if (!imgRef.current) {
      imgRef.current = document.querySelector(
        ".about-us__studio__banner__team",
      ) as HTMLDivElement;
    }
  }, []);

  useGSAP(() => {
    if (!isDesktop) {
      wrapperRef.current?.setAttribute("style", "");
      roomRef.current?.setAttribute("style", "");
      workRef.current?.setAttribute("style", "");
      peopleRef.current?.setAttribute("style", "");
      imgRef.current?.setAttribute("style", "");
      return;
    }
    if (
      !wrapperRef.current ||
      !roomRef.current ||
      !workRef.current ||
      !peopleRef.current ||
      !imgRef.current
    )
      return;

    const center = {
      top: "50%",
      left: "50%",
      y: "-50%",
      x: "-50%",
    };
    const tlStudioAnimLength = (window.innerHeight * 1.5).toString();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        pin: wrapperRef.current,
        end: "+=" + tlStudioAnimLength,
        scrub: 1,
      },
    });
    tl.set(roomRef.current, {
      opacity: 0.5,
      top: "-80px",
      left: "50%",
      x: "-50%",
      scaleY: 0.8,
      skewX: -10,
      transformOrigin: "top",
    });
    tl.set(workRef.current, {
      opacity: 0.5,
      bottom: "-80px",
      left: "50%",
      x: "-50%",
      scaleY: 0.8,
      skewX: 10,
      transformOrigin: "bottom",
    });
    tl.set(peopleRef.current, {
      opacity: 1,
      ...center,
      scale: 0,
      transformOrigin: "center",
      zIndex: 2,
      skewX: 10,
      y: ()=> window.innerHeight * -0.15,
    });
    tl.set(imgRef.current, {
      opacity: 1,
      top: "50%",
      left: "50%",
      y: "-50%",
      x: "-50%",
      scale: 0,
      transformOrigin: "center",
    });
    // prettier-ignore
    tl
      .to(roomRef.current, {
        opacity: 1,
        scaleY: 1,
        y: 128,
        skewX: 0,
      })
      .to(workRef.current, {
        opacity: 1,
        scaleY: 1,
        y: -128,
        skewX: 0,
      })
      .to([roomRef.current, workRef.current], {
        top: "50%",
        bottom: "50%",
        y: 0,
        translateY: "-50%",
        transformOrigin: "center",
        scale: 0.5,
        opacity: 0,
      })
      .to([roomRef.current, workRef.current], {
        scale: 0,
        opacity: 0,
      })
      .to([peopleRef.current, imgRef.current], {
        scale: 1,
      }, "<")
      .to(peopleRef.current, {
        scale: 1,
        y: () => window.innerHeight * 0.1,
        skewX: 0,
      }, "<")
      .to(peopleRef.current, {});
  }, {
    revertOnUpdate: true,
    dependencies: [isDesktop]
  });

  return <></>;
}
