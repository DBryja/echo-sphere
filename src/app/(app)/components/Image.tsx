"use client";
import NextImage, {ImageProps} from "next/image";
import { useState } from 'react';

const ImageWithFallback = ({
                               src,
                               alt,
                               width,
                               height,
                               className,
                               ...props
                           } : ImageProps) => {
    const fixedError = (process.env.NEXT_PUBLIC_NODE_ENV === "dev")
        ? (typeof src === "string" && !src.startsWith('/img'))
        : false;

    const [error, setError] = useState(fixedError);

    // Base64 encoded gradient - you can generate your own at https://png-pixel.com
    const placeholderDataUrl = "data:image/svg+xml;base64," + btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
    <linearGradient id="g" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="yellow" />
      <stop offset="100%" stop-color="red" />
    </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#g)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="32px" fill="#FFF">
        ${alt}
      </text>
    </svg>
  `);

    return (
            <NextImage
                src={error ? placeholderDataUrl : src}
                alt={alt}
                width={width}
                height={height}
                className={`${className || ''}`}
                onError={() => setError(true)}
                {...props}
                placeholder="blur"
                blurDataURL={placeholderDataUrl}
            />
    );
};

export default ImageWithFallback;