import type {Artist} from "@/payload-types";
import Image from "@components/Image";
import {getImageUrl, getImgAlt} from "@app/utils";
import Button from "@components/buttons/deafult";
import "./mobileArtist.scss";
import Link from "@components/Link";

export default function Index({artist, className=''}: {artist: Artist, className?: string}){
    return <div className={`${className} mobile-artist`}>
        <Image className="mobile-artist__img" src={getImageUrl(artist["img-profile"])} alt={getImgAlt(artist["img-profile"])} width={600} height={800}/>
        <Button className={"mobile-artist__btn"} color={"white"}>
            <Link href={`/artists/${artist.id}`}>More Info</Link></Button>
        <h2 className={"mobile-artist__name"}>{artist.name}</h2>
    </div>
}