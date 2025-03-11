"use client";
import NextImage, { ImageProps } from "next/image";
import { useState } from "react";

const ImageWithFallback = ({
                             src,
                             alt,
                             width,
                             height,
                             className,
                             fill,
                             ...props
                           }: ImageProps) => {
  const fixedError =
    process.env.NEXT_PUBLIC_NODE_ENV === "dev"
      ? typeof src === "string" && !src.startsWith("/img")
      : false;

  const [error, setError] = useState(fixedError);

  // Set default dimensions for the SVG
  const svgWidth = width || 300;
  const svgHeight = height || 200;

  // Create a safe version of alt text for SVG
  const safeAlt = alt
    ? alt
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
    : "Image";

  // SVG template with no newlines
  const svgTemplate = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="yellow" /><stop offset="100%" stop-color="red" /></linearGradient></defs><rect width="${svgWidth}" height="${svgHeight}" fill="url(#g)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="12px" fill="#FFF">${safeAlt}</text></svg>`;

  // Safely encode SVG to base64
  const encodeSvg = (svg: string) => {
    // For browsers - handle non-Latin1 characters
    if (typeof window !== 'undefined') {
      // Convert string to UTF-8
      return window.btoa(
        encodeURIComponent(svg).replace(
          /%([0-9A-F]{2})/g,
          (_, p1) => String.fromCharCode(parseInt(p1, 16))
        )
      );
    }
    // For Node.js environments
    return Buffer.from(svg).toString('base64');
  };

  const placeholderDataUrl = `data:image/svg+xml;base64,${encodeSvg(svgTemplate)}`;

  // Set up common props for the image component
  const imageProps = {
    src: error ? placeholderDataUrl : src,
    alt: alt || "Image",
    className: `${className || ""}`,
    onError: () => setError(true),
    placeholder: "blur" as const,
    blurDataURL: placeholderDataUrl,
    ...props
  };

  // Return appropriate NextImage based on whether fill is used
  if (fill) {
    return <NextImage {...imageProps} fill={fill} />;
  } else {
    return (
      <NextImage
        {...imageProps}
        width={width || 300}
        height={height || 200}
      />
    );
  }
};

export default ImageWithFallback;