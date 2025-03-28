import type { Artist } from "@/payload-types";
import Image from "@components/Image";
import { fetchArtistsArchiveCopy, fetchArtistsData } from "@app/utils/data";
import { getImageUrl, getImgAlt } from "@app/utils";
import "./artistsArchive.scss";
import VerticalSlider from "@components/artists/VerticalSlider";
import Link from "@components/Link";
import DraggableCarousel from "@components/draggableCarousel";
import MobileArtist from "@components/artists/MobileArtist";
import HideArrowAnim from "@components/shared/ArrowIcon/hideArrow-anim";
import AnimatedRow from "@components/artists/AnimatedRow";
import getDevice from "@utils/get-device";
import ArrowIcon from "@components/shared/ArrowIcon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Artists | Echo Sphere",
  description: "Our label is not just a business. It is a home for those who have been underrepresented, giving them the freedom to explore their talents and make their voice be heard. ",
};

export const revalidate = 86400;
export default async function Artists() {
  const [copyData, artistsData] = await Promise.all([
    fetchArtistsArchiveCopy(),
    fetchArtistsData(),
  ]);
  const { device, isDesktop, isTablet, isPhone } = await getDevice();
  const artists = artistsData.docs;
  const mobileSlides = artists.map((artist: Artist, i) => {
    return {
      id: i,
      content: <MobileArtist key={artist.id} artist={artist} />,
    };
  });

  return (
    <>
      <div className={`artists__wrapper ${isDesktop ? "isDesktop" : ""}`}>
        {device === "desktop" && (
          <div className={"artists__slider__wrapper"}>
            <div className={"artists__slider"}>
              <div id="artistSlider" className={"artists__slider__container"}>
                {artists.map((artist: Artist) => {
                  return (
                    <Link
                      key={artist.id}
                      className="artists__slider__item slider__item"
                      href={`/artists/${artist.id}`}
                    >
                      <Image
                        className={"slider__item__img"}
                        src={getImageUrl(artist["img-profile"])}
                        width={1000}
                        height={1000}
                        alt={getImgAlt(artist["img-profile"])}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className={"artists__slider__info"}>
              <span>Read More</span>
            </div>
            <div className={"artists__slider__bar"} id="artistSliderBar">
              <div
                className={"artists__slider__bar__container"}
                data-transform={`${artists.length * 100}%`}
              >
                {artists.toReversed().map((artist: Artist, index: number) => (
                  <h3
                    key={artist.id}
                    className="artist-name"
                    data-index={index}
                  >
                    {artist.name}
                  </h3>
                ))}
              </div>
            </div>
          </div>
        )}
        <section className={"artists__copy"}>
          <h1 className={"artists__copy__heading"}>{copyData.heading}</h1>
          <div className={"artists__copy__wrapper"}>
            {(isPhone || isTablet) && (
              <div className={"artists__copy__main"}>
                <p className={"bold"}>{copyData.subheading}</p>
                <p>
                  {copyData.desc1} {isTablet && copyData.desc2}
                </p>
              </div>
            )}
            {isDesktop && (
              <p className={"artists__copy__main"}>
                {copyData.subheading} {copyData.desc1} {copyData.desc2}
              </p>
            )}
            {isDesktop && (
              <p className={"artists__copy__extra"}>{copyData.desc3}</p>
            )}
            {isDesktop && (
              <div className={"artists__copy__arrow"}>
                <ArrowIcon />
              </div>
            )}
          </div>
          {isDesktop && (
            <div className={"artists__list"}>
              <h3 className={"artists__list__heading"}>Meet echo artists</h3>
              {artists.map((artist: Artist) => {
                return (
                  <AnimatedRow key={artist.id}>
                    <Link
                      className={"artists__list__item"}
                      href={`/artists/${artist.id}`}
                    >
                      {artist.name}
                    </Link>
                  </AnimatedRow>
                );
              })}
            </div>
          )}
        </section>
        {(isPhone || isTablet) && (
          <section className={"artists__mobile-list"}>
            <DraggableCarousel
              slides={mobileSlides}
              slidesPerView={isPhone ? 1.5 : 1.6}
              loop={false}
              freeMode={true}
            />
          </section>
        )}
        {isPhone && (
          <div className={"artists__copy__extra"}>
            <p>{copyData.desc2}</p>
          </div>
        )}
      </div>
      {isDesktop && <VerticalSlider qty={artists.length} />}
      {isDesktop && <HideArrowAnim selector={".arrow-icon"} />}
    </>
  );
}
