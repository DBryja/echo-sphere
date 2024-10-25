import {getPayloadHMR} from "@payloadcms/next/utilities";
import config from "@payload-config";
import type {Artist} from "@/payload-types";
import {headers} from "next/headers";
import Image from "next/image";
import "./artist.scss";
import {getImageUrl, getImgAlt} from "@app/utils";

import Icon from "@components/shared/socialIcon";
import type {Socials} from "@components/shared/socialIcon"
import Album from "@components/artists/Album";
import EventRow from "@components/events/EventRow";
import {fetchArtistsData} from "@utils/data";
import ArtistsCarousel from "@components/artists/ArtistsCarousel";

interface ArtistProps{
    params: {
        slug: string
    }
}

// export const revalidate = 86400;
export default async function Artist({params:{slug}}:ArtistProps){
    //TODO: Extract this to separate functions
    const payload = await getPayloadHMR({config});
    const artist:Artist = (
        await payload.findByID({
            collection: "artists",
            id: slug
        })
    )
    const releases = (
        await payload.find({
            collection: "releases",
            where: {
                'artists.id': {
                    in: [artist.id]
                }
            },
            sort: "-release-date",
            limit: 5,
            pagination: false
        })
    ).docs;
    const events = (
        await payload.find({
            collection: "events",
            where: {
                'related-artists.id': {
                    in: [artist.id]
                }
            },
            sort: "-date",
            limit: 5,
            pagination: false
        })
    ).docs;
    const artists = (await fetchArtistsData()).docs.filter((item)=>item.id!==artist.id);


    const device = headers().get("x-device-type") || "";
    const isPhone = device === "phone";
    console.log(device);
    const splitName = artist.name.split(" ");
    const socialsList = [];
    //@ts-ignore // ignoring due to undefined coming from payload types, this is still checked in the function
    for (const [key, value] of Object.entries(artist.socials) as [Socials, string][]) {
        if (key && value)
            socialsList.push(<Icon href={value} social={key} key={key} />);
    }


    return (
        <>
        <div className={"artist__wrapper"}>
            <h1 className={"artist__heading"}>{artist.name}</h1>
            <section className={"artist__details"}>
                <p className={"artist__details__desc"}>
                    {isPhone && <span className={"artist__details__desc__heading"}><Image src={"/img/dot.svg"} width={32} height={32} alt={""}/>About</span>}
                    {artist.description}
                    {!isPhone && artist.extra}
                </p>
                <div className={"artist__details__listen"}>
                    <p className={"artist__details__listen__heading"}>Listen {splitName[0]} on</p>
                    <p className={"artist__details__listen__icons"}>{socialsList.map((item)=>item)}</p>
                </div>
                {isPhone && <div className={"artist__details__separator"}>
                    <Image src={getImageUrl(artist["img-banner"])} alt={getImgAlt(artist["img-banner"])} width={500} height={300} />
                    <p>{artist.extra}</p>
                </div>}
                <div className={"artist__details__releases"}>
                    <h3 className={"artist__details__releases__heading"}>Albums & Singles:</h3>
                    <div className={"artist__details__releases__list"}>
                        {releases.map((item, i)=><Album key={i} item={item}/>)}
                        {/*{releases.map((item, i)=><div key={i}>{item.name}</div>)}*/}
                    </div>
                </div>
                <div className={"artist__details__events"}>
                    <h3 className={"artist__details__events__heading"}>UPCOMING EVENTS</h3>
                    <div className={"artist__details__events__list"}>
                        {events.map((event, i)=><EventRow key={i} event={event}/>)}
                    </div>
                </div>
            </section>
            <div className={"artist__image"} data-genre={artist.genre}>
                <Image src={getImageUrl(artist["img-profile"])} alt={getImgAlt(artist["img-banner"])} width={device==="phone"?500:1000} height={device==="phone"?500:1000} />
            </div>
        </div>
        <ArtistsCarousel artists={artists}/>
        </>
    )
}
