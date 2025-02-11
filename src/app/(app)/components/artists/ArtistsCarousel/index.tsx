"use client";
import { Artist } from "@/payload-types";
import DraggableCarousel, {
  DraggableCarouselProps,
} from "@components/draggableCarousel";

import "./artistsCarousel.scss";
import Image from "@components/Image";
import { getImageUrl, getImgAlt } from "@app/utils";
import Link from "@components/Link";

interface ArtistsCarouselProps extends Omit<DraggableCarouselProps, "slides"> {
  artists: Artist[];
}

export default function ArtistsCarousel({
  artists,
  className = "",
  ...rest
}: ArtistsCarouselProps) {
  const slides = artists.map((artist, i) => ({
    id: i,
    content: (
      <Link className={"artists-carousel__item"} href={`/artists/${artist.id}`}>
        <Image
          src={getImageUrl(artist["img-profile"])}
          alt={getImgAlt(artist["img-profile"])}
          width={500}
          height={600}
        />
        <h4>{artist.name}</h4>
      </Link>
    ),
  }));

  return (
    <div
      className={`artists-carousel__wrapper ${className}`}
      id={"artists-carousel"}
    >
      <div className={"artists-carousel__bar"}>
        <h3>Our Artists</h3>
      </div>
      <DraggableCarousel
        slides={slides}
        className={"artists-carousel__swiper"}
        breakpoints={
          rest.breakpoints
            ? rest.breakpoints
            : {
                0: { slidesPerView: 2.2 },
                767: { slidesPerView: 3.3 },
                1024: { slidesPerView: 4.5 },
              }
        }
        {...rest}
      />
    </div>
  );
}
