import {getPayloadHMR} from "@payloadcms/next/utilities";
import config from "@payload-config"
import type {Artist, ArtistsArchive} from "@/payload-types";
import Image from "next/image"
import {headers} from "next/headers"
import {fetchArtistsData} from "@app/utils/data";
import {getAlt, getImageUrl, getImgAlt} from "@app/utils";
import "./artistsArchive.scss";
import VerticalSlider from "@components/artists/VerticalSlider"
import Link from "@components/Link";


export const revalidate = 86400;
export default async function Artists(){
    const payload = await getPayloadHMR({config});
    const copyData:ArtistsArchive = (
        await payload.find({
            collection: "artistsArchive",
            pagination: false
        })
    ).docs[0];
    const artists = (await fetchArtistsData()).docs;
    const device = headers().get("x-device-type") || "";

    return (
        <>
        <div className={"artists__wrapper"}>
            <section className={"artists__slider__wrapper"}>
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
            </section>
            <section className={"artists__copy"}>
                <h1 className={"artists__copy__heading"}>{copyData.heading}</h1>
                <div className={"artists__copy__wrapper"}>
                    <p className={"artists__copy__main"}>{copyData.subheading} {copyData.desc1} {copyData.desc2}</p>
                    {device === "desktop" && <p className={"artists__copy__extra"}>{copyData.desc3}</p>}
                </div>
            </section>
        </div>
            <VerticalSlider qty={artists.length}/>
        </>
    )
}


//Todo: add buttons