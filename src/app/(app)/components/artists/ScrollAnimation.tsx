"use client";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {useRef} from "react";
import {useWindowWidth} from "@hooks/useWindowWidth";

export default function ScrollAnimation(){
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const pinRef = useRef<HTMLDivElement | null>(null);
    const contentContainer = useRef<HTMLDivElement | null>(null);
    const windowWidth = useWindowWidth();

    useGSAP(()=>{
        gsap.registerPlugin(ScrollTrigger);
        sliderRef.current = document.querySelector(".artists__slider__wrapper");
        contentContainer.current = document.querySelector(".artists__wrapper");

        if(!sliderRef.current) return;

        const tl = gsap.to(sliderRef.current, {
            scrollTrigger: {
                trigger: pinRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                pin: sliderRef.current,
                invalidateOnRefresh: true,
                pinSpacing: true,
                onRefresh: self => {
                    self.vars.pinSpacing && self.pin &&
                    gsap.set(self.pin, { top: 0 });
                }
            },
        })

        return () => {
            tl.kill();
        }
    }, [windowWidth])

    return <div id={"artists-pin"} ref={pinRef} style={{pointerEvents: "none", position: "fixed", top: 0, height: contentContainer.current?.clientHeight}}></div>
}