"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import debounce from 'lodash/debounce';

import variables from "@globals/_variables.module.scss";

import Nav from "@components/shared/nav";
import HeaderMenuButton from "@components/buttons/menu";
import Menu from "@components/menu";
import {useWindowWidth} from "@hooks/useWindowWidth";
import OpenCart from "@components/OpenCart";

gsap.registerPlugin(ScrollTrigger);

export default function NavButtonContainer() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNav, setShowNav] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const container = useRef<HTMLDivElement | null>(null);
    const currentTimeline = useRef<gsap.core.Timeline | null>(null);
    const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);
    const breakpoint = parseInt(variables["bpLg"].replace("px", ""), 10);

    const windowWidth = useWindowWidth();

    const xOffset = 5;
    const stagger = 0.05;

    useEffect(() => {
        setIsLoaded(true);
    }, [windowWidth]);

    const updateNavVisibility = useCallback((progress: number) => {
        setShowNav(progress <= 0.5);
    }, []);

    const debouncedSetShowNav = useCallback(
        debounce(updateNavVisibility, 50),
        [updateNavVisibility]
    );

    const toggleMenu=()=>{
        setIsMenuOpen((prev)=>!prev);
    }

    useGSAP(() => {
        if (!container.current) return;
        if(windowWidth < breakpoint) return;

        scrollTriggerInstance.current = ScrollTrigger.create({
            trigger: "body",
            start: "150px 100px",
            end: "+=0",
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
    }, [debouncedSetShowNav, windowWidth]);

    useGSAP(() => {
        // Kill the previous timeline if it exists
        if (currentTimeline.current) {
            currentTimeline.current.kill();
        }
        // Create a new timeline
        let tl = gsap.timeline();
        currentTimeline.current = tl;

        // Ensure the menu button is always visible for small screens
        if(windowWidth <= breakpoint){
            if(document.querySelector(".header__nav")){
                tl.to(".header__nav", {
                    visibility: "hidden",
                    display: "none",
                });
            }
            tl.to(".header__menu", {
                x: 0,
                visibility: "visible",
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
                display: "flex",
            });
        }
        else {
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
        }

        return () => {
            if (currentTimeline.current) {
                currentTimeline.current.kill();
            }
        };
    }, [showNav, windowWidth]);

    return (
        <div ref={container} style={{ display: "flex", alignItems: "center", justifyContent: "end", position: "relative", width: "fit-content" }}>
            {windowWidth >= breakpoint && <Nav />}
            <OpenCart/>
            <Menu isOpen={isMenuOpen}/>
            <HeaderMenuButton onClick={toggleMenu} isMenuOpen={isMenuOpen}/>
        </div>
    );
}