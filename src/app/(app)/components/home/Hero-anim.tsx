"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";
import { useWindowWidth } from "@hooks/useWindowWidth";

export default function HeroAnim(){
  const [wordsRef, setWordsRef] = useState<HTMLElement[] | null>(null);
  const titlesRef = useRef<HTMLElement[] | null>(null);
  const descLinesRef = useRef<HTMLElement[] | null>(null);
  const barTitlesRef = useRef<HTMLElement[] | null>(null);
  const windowWidth = useWindowWidth();
  const breakpoint = Math.floor(windowWidth/200);

  useEffect(() => {
    titlesRef.current = Array.from(document.querySelectorAll(".home__hero__title")) as HTMLElement[];
    new SplitType(document.querySelector(".home__hero__desc") as HTMLElement, { types: "lines" });
    descLinesRef.current = Array.from(document.querySelectorAll(".home__hero__desc > div")) as HTMLElement[];
    barTitlesRef.current = Array.from(document.querySelectorAll(".home__hero__decor > h3")) as HTMLElement[];

    [...titlesRef.current, ...descLinesRef.current].forEach((el) => {
      new SplitType(el, { types: "words", wordClass: "wordToAnim", tagName: "span" });
    });

   setWordsRef(Array.from(document.querySelectorAll(".wordToAnim")) as HTMLElement[]);
  }, []);

  useGSAP(()=>{
    if(!wordsRef) return;
    const tl = gsap.timeline({})
    tl.set([wordsRef, barTitlesRef.current], {yPercent: 150, skewY: 10, opacity: 1});
    tl.to([wordsRef, barTitlesRef.current],
      {
      duration: 1.5,
      yPercent: 0,
      skewY: 0,
      stagger: 0.05,
      delay: 0.1,
      ease: "power4.out",
    });
  }, {
    revertOnUpdate: true,
    dependencies: [breakpoint]
  })


  return <></>
}