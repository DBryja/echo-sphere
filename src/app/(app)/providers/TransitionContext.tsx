'use client';

import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import gsap from 'gsap';
import {useGSAP} from "@gsap/react";

interface TransitionContextType {
    startTransition: () => void;
    endTransition: () => void;
    transitionBoxRef: React.RefObject<HTMLDivElement>;
    transitionDuration: number;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const transitionBoxRef = useRef<HTMLDivElement>(null);
    const tl = useRef<GSAPTimeline>(gsap.timeline());
    const [direction, setDirection] = useState<"enter"|"exit"|"initial">("initial");

    // Returns transition duration in Seconds
    const transitionDuration:number = 0.8;
    useGSAP(() => {
        if (!transitionBoxRef.current) return;

        if(direction==="enter"){
            tl.current.set(transitionBoxRef.current, {
                opacity: 1,
                yPercent: 0,
            })
            tl.current.to(transitionBoxRef.current, {
                yPercent: -100,
                duration: transitionDuration,
                ease: "power2.inOut"
            })
        } else if(direction ==="exit"){
            tl.current.to(transitionBoxRef.current, {
                yPercent: -200,
                duration: transitionDuration,
                ease: "power2.out"
            },`>0.4`)
        }
    }, [direction]);


    const startTransition = () => {
        setDirection("enter");
    };

    const endTransition = () => {
        setDirection("exit")
    };

    return (
        <TransitionContext.Provider value={{ startTransition, endTransition, transitionBoxRef, transitionDuration }}>
            {children}
        </TransitionContext.Provider>
    );
};

export const useTransition = () => {
    const context = useContext(TransitionContext);
    if (context === undefined) {
        throw new Error('useTransition must be used within a TransitionProvider');
    }
    return context;
};