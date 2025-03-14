import Image from "@components/Image";
import "./artist.scss";
import { getImageUrl, getImgAlt } from "@app/utils";

import Icon from "@components/shared/socialIcon";
import type { Socials } from "@components/shared/socialIcon";
import Album from "@components/artists/Album";
import EventRow from "src/app/(app)/components/events/ArtistEventRow";
import {
  fetchArtistById,
  fetchArtistsData,
  fetchEventsByArtistId,
  fetchReleasesByArtistId,
} from "@utils/data";
import ArtistsCarousel from "@components/artists/ArtistsCarousel";
import getDevice from "@utils/get-device";
import { generateMeta } from "@utils/meta";

interface ArtistProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Artist({ params }: ArtistProps) {
  const { slug } = await params;
  const [artist, artistsData] = await Promise.all([
    fetchArtistById(slug),
    fetchArtistsData(),
  ]);
  const [releases, events] = await Promise.all([
    fetchReleasesByArtistId(artist.id),
    fetchEventsByArtistId(artist.id),
  ]);

  const artists = artistsData.docs.filter((item) => item.id !== artist.id);

  const {isPhone} = await getDevice();
  const splitName = artist.name.split(" ");
  const socialsList = [];
  //@ts-ignore // ignoring due to undefined coming from payload types, this is still checked in the function
  for (const [key, value] of Object.entries(artist.socials) as [
    Socials,
    string,
  ][]) {
    if (key && value)
      socialsList.push(<Icon href={value} social={key} key={key} />);
  }

  return (
    <>
      <div className={"artist__wrapper"}>
        <h1 className={"artist__heading"}>{artist.name}</h1>
        <section className={"artist__details"}>
          <p className={"artist__details__desc"}>
            {isPhone && (
              <span className={"artist__details__desc__heading"}>
                <Image src={"/img/dot.svg"} width={32} height={32} alt={""} />
                About
              </span>
            )}
            {artist.description}
            {!isPhone && artist.extra}
          </p>
          <div className={"artist__details__listen"}>
            <p className={"artist__details__listen__heading"}>
              Listen {splitName[0]} on
            </p>
            <p className={"artist__details__listen__icons"}>
              {socialsList.map((item) => item)}
            </p>
          </div>
          {isPhone && (
            <div className={"artist__details__separator"}>
              <Image
                src={getImageUrl(artist["img-banner"])}
                alt={getImgAlt(artist["img-banner"])}
                width={500}
                height={300}
              />
              <p>{artist.extra}</p>
            </div>
          )}
          <div className={"artist__details__releases"}>
            <h3 className={"artist__details__releases__heading"}>
              Albums & Singles:
            </h3>
            <div className={"artist__details__releases__list"}>
              {releases.map((item, i) => (
                <Album key={i} item={item} />
              ))}
              {/*{releases.map((item, i)=><div key={i}>{item.name}</div>)}*/}
            </div>
          </div>
          <div className={"artist__details__events"}>
            <h3 className={"artist__details__events__heading"}>
              UPCOMING EVENTS
            </h3>
            <div className={"artist__details__events__list"}>
              {events.map((event, i) => (
                <EventRow key={i} event={event} />
              ))}
            </div>
          </div>
        </section>
        <div className={"artist__image"} data-genre={artist.genre}>
          <Image
            src={getImageUrl(artist["img-profile"])}
            alt={getImgAlt(artist["img-banner"])}
            width={isPhone? 350 : 600}
            height={isPhone ? 350 : 600}
          />
        </div>
      </div>
      <ArtistsCarousel artists={artists} />
    </>
  );
}


export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise;
  const post = await fetchArtistById(slug);
  return generateMeta({ doc: post });
}
