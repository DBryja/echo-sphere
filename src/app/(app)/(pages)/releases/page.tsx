import React from "react";
import getDevice from "@utils/get-device";
import { fetchReleases } from "@utils/data";
import Carousel from "@components/releases/carousel";
import Album from "@components/releases/Album";
import "./releasesArchive.scss";
import { Release } from "@/payload-types";

export interface ISlide {
  id: number;
  cover: React.ReactNode;
  title: string;
  links: Release["links"];
}

export const revalidate = 86400;
export default async function Releases() {
  const releases = await fetchReleases();
  const { isPhone } = getDevice();

  const slides: ISlide[] = releases.map((item, i) => ({
    id: i,
    cover: (
      <div className={"releases__carousel__item"}>
        <Album item={item} big={!isPhone} />
      </div>
    ),
    title: `${item.authors} / ${item.name}`,
    links: item.links,
  }));

  return (
    <div className={"releases__wrapper"}>
      <h1 className={"releases__heading"}>NEW RELEASES</h1>
      <p className={"releases__copy"}>
        <span>
          Discover the latest albums from Echo Sphere artists, freshly released
          and ready for you to explore.
          {!isPhone &&
            " Whether you're into electronic beats, indie vibes, or something in between, you're sure to find sounds that resonate with you."}
        </span>
      </p>
      <div className={"releases__carousel"}>
        <Carousel slides={slides} />
        <p className={"releases__carousel__info"}>drag or click to navigate</p>
      </div>
    </div>
  );
}
