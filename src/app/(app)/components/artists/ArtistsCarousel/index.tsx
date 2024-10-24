"use client";
import {Artist} from "@/payload-types";
import DraggableCarousel from "@components/draggableCarousel";

import './artistsCarousel.scss'
import Image from "next/image";
import {getImageUrl, getImgAlt} from "@app/utils";
import Link from "@components/Link";

export default function ArtistsCarousel({artists}:{artists:Artist[]}){
    const slides = artists.map((artist, i)=>({
        id: i,
        content: <Link className={"artists__carousel__item"} href={`/artists/${artist.id}`}>
            <Image src={getImageUrl(artist["img-profile"])} alt={getImgAlt(artist["img-profile"])} width={500} height={600}/>
            <h4>{artist.name}</h4>
        </Link>}));
    return (
        <DraggableCarousel slides={slides} className={"artists__carousel"}/>
    );
}

