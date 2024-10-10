import {useState, useEffect} from "react";

const subscribers = new Set<(width: number) => void>();
let windowWidth = 0;

function getWindowWidth(){
    return typeof window !== 'undefined' ? window.innerWidth : 0;
}

function updateWindowWidth(){
    const newWidth = getWindowWidth();
    if(newWidth !== windowWidth){
        windowWidth = newWidth;
        subscribers.forEach((callback)=>callback(windowWidth));
    }
}

export function useWindowWidth(){
    const [width, setWidth]  = useState(getWindowWidth());

    useEffect(()=>{
        const handleResize = () => {
            updateWindowWidth();
        }

        setWidth(getWindowWidth());

        window.addEventListener("resize", handleResize);
        subscribers.add(setWidth);

        return () => {
            window.removeEventListener("resize", handleResize);
            subscribers.delete(setWidth);
        }
    }, []);

    return width;
}