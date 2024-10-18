"use client";
import {useEffect, useRef, useState} from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
//@ts-ignore
gsap.registerPlugin(ScrollToPlugin);

export default function VerticalSlider({qty}:{qty:number}) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const shouldPauseRef = useRef<boolean>(null);
    const tlRef = useRef<GSAPTimeline>(null);

    //animation variables:
    const duration = 3;
    const delay = 2;
    // ((progress / (qty of steps)) / (step duration with delay)) gives a progress fraction equal to 1s
    const threshold = (1/(qty+1))/(duration+delay)

    useEffect(() => {
        if (!sliderRef.current || !barRef.current || !containerRef.current) {
            containerRef.current = document.querySelector(".artists__slider__wrapper")
            sliderRef.current = document.getElementById("artistSlider") as HTMLDivElement;
            barRef.current = document.querySelector(".artists__slider__bar__container") as HTMLDivElement;
        }
        if (!sliderRef.current || !barRef.current || !containerRef.current) return;
        // Ensure we only append the clone once
        if (!sliderRef.current.querySelector(".clone")) {
            const images = sliderRef.current.querySelectorAll(".slider__item");
            const firstImageClone = images[0].cloneNode(true) as HTMLElement;
            firstImageClone.classList.add("clone"); // Add a class to identify the clone
            sliderRef.current.append(firstImageClone);
        }
        if (!barRef.current.querySelector(".clone")) {
            const emptyName = document.createElement("h3");
            emptyName.classList.add("artist-name", "clone");
            barRef.current.prepend(emptyName);
        }

        gsap.set(barRef.current, { yPercent: (qty+1) * -100 });
        gsap.set(sliderRef.current, { yPercent: 0 });

        const tl = gsap.timeline({
            repeat: -1,
            paused: true,
        });
        tlRef.current = tl;

        const checkPauseCondition = () => {
            if (shouldPauseRef.current && tlRef.current) {
                const progress = tlRef.current.progress();
                const nextStepProgress = Math.ceil(progress * (qty+1)) / (qty+1);
                if(nextStepProgress === 1) return;
                const bonds = [nextStepProgress-threshold/5, nextStepProgress+threshold*3];
                if(progress >= bonds[0] && progress < bonds[1]){
                    // console.info("progress", progress);
                    // console.info("stepProgress", nextStepProgress);
                    // console.info("bonds", bonds);
                    tlRef.current.pause();
                }
            }
        };
        const handleMouseOver = () => {
            shouldPauseRef.current = true;
            checkPauseCondition();
        };
        const handleMouseLeave = () => {
            shouldPauseRef.current = false;
            if (tlRef.current && tlRef.current.paused()) {
                tlRef.current.play();
            }
        };

        containerRef.current.addEventListener("mouseover", handleMouseOver);
        containerRef.current.addEventListener("mouseleave", handleMouseLeave);

        // Add event listeners for timeline state changes
        tl.eventCallback("onUpdate", checkPauseCondition);
        tl.eventCallback("onResume", checkPauseCondition);

        // Animate through all images including the clone
        for (let i = 0; i <= qty; i++) {
            tl.to(sliderRef.current, {
                duration: duration,
                y: i === 0 ? "-=0vh" : "-=100vh",
                delay: delay,
                ease: "power3.inOut",
            });
            tl.to(barRef.current,{
                duration: duration,
                y: "+=100%",
                ease: "power3.inOut",
            },"<");
        }

        tl.play();

        return () => {
            containerRef.current.removeEventListener("mouseover", handleMouseOver);
            containerRef.current.removeEventListener("mouseleave", handleMouseLeave);
            tlRef.current.kill();
        };
    }, [qty, threshold]);

    return (<></>);
}