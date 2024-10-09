"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import debounce from 'lodash/debounce';

import Nav from "@components/shared/nav";
import HeaderMenuButton from "@components/buttons/menu";

gsap.registerPlugin(ScrollTrigger);

export default function NavButtonContainer() {
    const container = useRef<HTMLDivElement | null>(null);
    const [showNav, setShowNav] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const xOffset = 5;
    const stagger = 0.05;
    const currentTimeline = useRef<gsap.core.Timeline | null>(null);
    const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const updateNavVisibility = useCallback((progress: number) => {
        setShowNav(progress <= 0.5);
    }, []);

    const debouncedSetShowNav = useCallback(
        debounce(updateNavVisibility, 50),
        [updateNavVisibility]
    );

    const checkScrollPosition = useCallback(() => {
        if (scrollTriggerInstance.current) {
            const currentProgress = scrollTriggerInstance.current.progress;
            updateNavVisibility(currentProgress);
        }
    }, [updateNavVisibility]);

    useEffect(() => {
        const intervalId = setInterval(checkScrollPosition, 1000);
        return () => clearInterval(intervalId);
    }, [checkScrollPosition]);

    useGSAP(() => {
        if (!container.current) return;

        scrollTriggerInstance.current = ScrollTrigger.create({
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            onUpdate: (self) => {
                debouncedSetShowNav(self.progress);
            },
        });

        return () => {
            if (scrollTriggerInstance.current) {
                scrollTriggerInstance.current.kill();
            }
            debouncedSetShowNav.cancel();
        };
    }, [debouncedSetShowNav]);

    useGSAP(() => {
        console.info("useGSAP", showNav);

        // Kill the previous timeline if it exists
        if (currentTimeline.current) {
            currentTimeline.current.kill();
        }

        // Create a new timeline
        let tl = gsap.timeline();
        currentTimeline.current = tl;

        if (showNav) {
            tl.to(".header__menu", {
                x: xOffset,
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
            });
            tl.set(".header__menu", {
                visibility: "hidden",
                display: "none",
            }, ">");
            tl.to(".header__nav", {
                visibility: "visible",
                display: "flex",
            }, "<-0.5");
            tl.to(".header__nav > *", {
                x: 0,
                opacity: 1,
                stagger: -1*stagger,
                duration: 0.1,
                ease: "power2.out",
            }, ">-0.1");
        } else {
            tl.to(".header__nav > *", {
                x: xOffset,
                opacity: 0,
                stagger: stagger,
                duration: 0.1,
                ease: "power2.out",
            });
            tl.to(".header__nav", {
                visibility: "hidden",
                display: "none",
            }, ">-0.1");
            tl.to(".header__menu", {
                x: 0,
                visibility: "visible",
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                display: "flex",
            }, "<");
        }

        return () => {
            if (currentTimeline.current) {
                currentTimeline.current.kill();
            }
        };
    }, [showNav]);

    return (
        <div ref={container} style={{ display: "flex", alignItems: "center", justifyContent: "end", position: "relative", width: "fit-content" }}>
            <Nav />
            <HeaderMenuButton isLoaded={isLoaded} />
        </div>
    );
}