import type {Artist} from "@/payload-types";
import Image from "@components/Image";
import {headers} from "next/headers"
import {fetchArtistsArchiveCopy, fetchArtistsData} from "@app/utils/data";
import {getImageUrl, getImgAlt} from "@app/utils";
import "./artistsArchive.scss";
import VerticalSlider from "@components/artists/VerticalSlider"
import Link from "@components/Link";
import DraggableCarousel from "@components/draggableCarousel";
import MobileArtist from "@components/artists/MobileArtist";


export const revalidate = 86400;
export default async function Artists(){
    const [copyData, artistsData] = await Promise.all([
        fetchArtistsArchiveCopy(),
        fetchArtistsData()
    ]);
    const device = headers().get("x-device-type") || "";
    const isDesktop = device === "desktop";
    const isPhone = device === "phone";
    const isTablet = device === "tablet";
    const artists = artistsData.docs;
    const mobileSlides = artists.map((artist: Artist, i) => {
        return {
        id: i,
        content: <MobileArtist key={artist.id} artist={artist}/>
        }
    });

    return (
        <>
        <div className={"artists__wrapper"}>
            {device === "desktop" && <section className={"artists__slider__wrapper"}>
                <div className={"artists__slider"}>
                    <div id="artistSlider" className={"artists__slider__container"}>
                    {artists.map((artist: Artist) => {
                        return (<Link key={artist.id} className="artists__slider__item slider__item" href={`/artists/${artist.id}`}>
                            <Image
                                className={"slider__item__img"}
                                src={getImageUrl(artist["img-profile"])}
                                width={1000} height={1000}
                                alt={getImgAlt(artist["img-profile"])}
                            />
                        </Link>)
                    })}
                    </div>
                </div>
                <div className={"artists__slider__info"}>
                    <span>
                        Read More
                    </span>
                </div>
                <div className={"artists__slider__bar"} id="artistSliderBar">
                    <div className={"artists__slider__bar__container"} data-transform={`${artists.length*100}%`}>
                        {artists.toReversed().map((artist: Artist, index: number) => (
                            <h3 key={artist.id} className="artist-name" data-index={index}>{artist.name}</h3>
                        ))}
                    </div>
                </div>
            </section>}
            <section className={"artists__copy"}>
                <h1 className={"artists__copy__heading"}>{copyData.heading}</h1>
                <div className={"artists__copy__wrapper"}>
                    {(isPhone || isTablet ) && <div className={"artists__copy__main"}>
                        <p className={"bold"}>{copyData.subheading}</p>
                        <p>{copyData.desc1} {isTablet && copyData.desc2}</p>
                    </div>}
                    {isDesktop && <p className={"artists__copy__main"}>
                        {copyData.subheading} {copyData.desc1} {copyData.desc2}
                    </p>}
                    {isDesktop&& <p className={"artists__copy__extra"}>{copyData.desc2}</p>}
                </div>
            </section>
            {(isPhone || isTablet )  && <section className={"artists__mobile-list"}>
                <DraggableCarousel slides={mobileSlides} slidesPerView={isPhone?1.5:1.6} loop={false} freeMode={true}/>
            </section>}
            {isPhone && <div className={"artists__copy__extra"}><p>{copyData.desc2}</p></div>}

        </div>
            {isDesktop && <VerticalSlider qty={artists.length}/>}
        </>
    )
}


//Todo: add buttons