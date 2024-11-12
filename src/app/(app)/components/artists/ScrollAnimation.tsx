"use client";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import {useRef} from "react";
import {useWindowWidth} from "@hooks/useWindowWidth";

export default function ScrollAnimation(){
    const arrowRef = useRef<HTMLDivElement | null>(null);
    const windowWidth = useWindowWidth();

    useGSAP(()=>{
        gsap.registerPlugin(ScrollTrigger);
        arrowRef.current = document.querySelector(".artists__copy__arrow");
        if(!arrowRef.current) return;

        gsap.to(arrowRef.current, {
            scrollTrigger: {
                trigger: ".artists__copy__arrow",
                start: "top 80%",
                end: "+=80px",
                toggleActions: "play play reverse reverse" // Add this line
            },
            opacity: 0,
            duration: 0.15
        })

    }, [windowWidth])

    return <></>
}