"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
//@ts-ignore
gsap.registerPlugin(ScrollToPlugin);

export default function VerticalSlider({qty}:{qty:number}) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sliderRef.current || !barRef.current) {
            sliderRef.current = document.getElementById("artistSlider") as HTMLDivElement;
            barRef.current = document.querySelector(".artists__slider__bar__container") as HTMLDivElement;
        }
        if (sliderRef.current && barRef.current) {
            if (sliderRef.current && barRef.current) {
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
            }
            gsap.set(barRef.current, { yPercent: (qty+1) * -100 });
            gsap.set(sliderRef.current, { yPercent: 0 });

            const tl = gsap.timeline({
                repeat: -1,
                paused: true,
            });

            // Animate through all images including the clone
            for (let i = 0; i <= qty; i++) {
                tl.to(sliderRef.current, {
                    duration: 3,
                    y: i === 0 ? "-=0vh" : "-=100vh",
                    delay: 2,
                    ease: "power3.inOut",
                });
                tl.to(barRef.current,{
                    duration: 3,
                     y: "+=100%",
                    ease: "power1.inOut",
                },"<");
            }

            tl.play();

            return () => {
                tl.kill();
            };
        }
    }, []);

    return <></>;
}