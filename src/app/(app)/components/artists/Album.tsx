import type {Artist, Release} from "@/payload-types";
import Image from "next/image";
import {getImageUrl, getImgAlt} from "@app/utils";
import "./album.scss";

export default async function Album({item}:{item:Release}){

    return (
        <div className="album">
                <Image src={getImageUrl(item["img-cover"])} alt={getImgAlt(item["img-cover"])} width={150} height={150}/>
            <div className={"album__details"}>
                <h4>{item.name}</h4>
                <p>{item.authors}</p>
                <p>{new Date(item["release-date"]).getUTCFullYear()}</p>
            </div>
        </div>
    )
}