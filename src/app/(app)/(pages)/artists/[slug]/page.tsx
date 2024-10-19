import {getPayloadHMR} from "@payloadcms/next/utilities";
import config from "@payload-config";
import type {Artist, ArtistsArchive} from "@/payload-types";
import {headers} from "next/headers";
import SocialIcon from "@components/shared/SocialIcon";
import type {Socials} from "@components/shared/SocialIcon"

interface ArtistProps{
    params: {
        slug: string
    }
}

export const revalidate = 86400;
export default async function Artist({params:{slug}}:ArtistProps){
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
            sort: "-date",
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


    const device = headers().get("x-device-type") || "";
    const splitName = artist.name.split(" ");
    const socialsList = [];
    //@ts-ignore // ignoring due to undefined coming from payload types, this is still checked in the function
    for (const [key, value] of Object.entries(artist.socials) as [Socials, string][]) {
        if (key && value)
            socialsList.push(<SocialIcon href={value} social={key} key={key} />);
    }


    return (
        <div className={"artist__wrapper"}>
            <h1>{artist.name}</h1>
            <section className={"artist__details"}>
                <p className={"artist__details__desc"}>
                    {artist.description}
                </p>
                <div className={"artist__details__listen"}>
                    <p className={"artist__details__listen__heading"}>Listen {splitName[0]} ON</p>
                    <p className={"artist__details__listen__icons"}>{socialsList.map((item)=>item)}</p>
                </div>
                <div className={"artist__details__releases"}>
                    <h3>Releases:</h3>
                    {releases.map((item, i)=><div key={i}>{item.name}</div>)}
                </div>
                <div className={"artists__details__events"}>
                    <h3>Events:</h3>
                    {events.map((item, i)=><div key={i}>{item.heading}</div>)}
                </div>
            </section>
            <div className={"artist__image"}>
                {/*<p>{artist.}</p>*/}
            </div>
        </div>
    )
}