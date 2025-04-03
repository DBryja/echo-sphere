'use client';

import { useState } from 'react';
import Image from 'next/image';
import "./ProductImages.scss";
import { Media } from "@/payload-types";

interface ImageObject {
  img?: string | Media | null | undefined;
}
interface CompleteImageObject {
  img: string | Media;
}

interface ProductImagesProps {
  images?: ImageObject[] | null | undefined;
  productName: string;
}

export default function ProductImages({ images, productName }: ProductImagesProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) return null;
  // Filter out null or undefined images
  const filteredImages =  images.filter((image): image is CompleteImageObject => {
    const img = image.img;
    return img !== null && img !== undefined && (typeof img === 'string' || (typeof img === 'object' && 'url' in img));
  }) as CompleteImageObject[];

  // Get the current selected image
  const selectedImage = filteredImages[selectedImageIndex].img;

  return (
    <div className="product-page__images">
      <div className="product-page__images__main">
        {selectedImage && (
          <Image
            src={typeof selectedImage === 'string'
              ? selectedImage
              : selectedImage.url!}
            alt={typeof selectedImage === 'string'
              ? productName
              : selectedImage.alt! || productName}
            width={600}
            height={600}
            quality={90}
            priority={selectedImageIndex === 0} // Load first image with priority
            className="product-page__images__main-image"
          />
        )}
      </div>

      <div className="product-page__images__thumbnails">
        {filteredImages.map((image, i) => {
          if (!image) return null;
          const img = image.img;

          return (
            <button
              key={i}
              onClick={() => setSelectedImageIndex(i)}
              className={`product-page__images__thumbnail-button ${
                i === selectedImageIndex ? 'product-page__images__thumbnail-button--active' : ''
              }`}
            >
              <Image
                src={typeof img === 'string'
                  ? img
                  : img.url!}
                alt={typeof img === 'string'
                  ? productName
                  : img.alt! || productName}
                width={100}
                height={100}
                quality={60} // Lower quality for thumbnails
                className="product-page__images__thumbnail-image"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}