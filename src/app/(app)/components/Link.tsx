'use client';

import React from "react";
import NextLink, { LinkProps } from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from '@providers/TransitionContext';
import {Url} from "next/dist/shared/lib/router/router";

interface CustomLinkProps extends LinkProps {
    children: React.ReactNode,
    className?: string,
    onItemClick?: ()=>void
}
const comparePaths = (pathname:string, href:(string| Url)):boolean => {
    const normalize = (path:(string|Url)) => {
        if(typeof(path) !== "string") path = path.toString();
        return path.replace(/^\/+/, '');
    }
    const hrefPath = typeof href === 'string' ? href : href.pathname || '';
    return normalize(pathname) === normalize(hrefPath);
};

export default function Link({ children, onItemClick, className, ...props }:CustomLinkProps){
    const router = useRouter();
    const { startTransition, transitionDuration } = useTransition();
    const pathname = usePathname();
    const {href} = {...props};
    const arePathsEqual = comparePaths(pathname, href);

    const handleClick = () => {
        startTransition();
        setTimeout(() => {
            router.push(props.href.toString());
        }, transitionDuration*1000); // Adjust this timing to match your transition duration
    };

    const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>{
        e.preventDefault();
        if(arePathsEqual && onItemClick){
            onItemClick();
            return;
        }
        handleClick();
    }

    return (<NextLink {...props} className={className} onClick={onClick}>{children}</NextLink>);
};