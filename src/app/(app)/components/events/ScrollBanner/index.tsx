"use client";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowWidth } from "@hooks/useWindowWidth";

export default function ScrollBanner({
  bannerId,
  titleId,
}: {
  bannerId: string;
  titleId?: string;
}) {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useWindowWidth() > 1024;

  useEffect(() => {
    if (!bannerRef.current) {
      bannerRef.current = document.getElementById(bannerId) as HTMLDivElement;
    }
    if (titleId && !titleRef.current) {
      titleRef.current = document.getElementById(titleId) as HTMLDivElement;
    }
  }, [bannerId, titleId]);

  useGSAP(() => {
    if (!isDesktop) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(bannerRef.current);
      gsap.killTweensOf(titleRef.current);
      return;
    }

    const endHeight = window.innerHeight * 0.75;
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top top",
          end: () => "+=" + endHeight,
          scrub: 1.1,
        },
        y: "-30%",
      });
    }
    if (titleRef.current && bannerRef.current) {
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top top",
          end: () => "+=" + endHeight,
          scrub: 1.1,
        },
        y: "42vh",
      });
    }
  }, [bannerRef.current, titleRef.current, isDesktop]);

  return <></>;
}
