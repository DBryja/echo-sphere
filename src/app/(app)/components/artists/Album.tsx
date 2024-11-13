import type { Release} from "@/payload-types";
import Image from "@components/Image";
import {getImageUrl, getImgAlt} from "@app/utils";
import "./album.scss";

export default async function Album({item, big}:{item:Release, big?:boolean}){

    return (
        <div className={`album ${big?"album--big":""}`}>
                <Image src={getImageUrl(item["img-cover"])} alt={getImgAlt(item["img-cover"])} width={big?512:256} height={big?512:256}/>
            <div className={"album__details"}>
                <h4>{item.name}</h4>
                <p>{item.authors}</p>
                <p>{new Date(item["release-date"]).getUTCFullYear()}</p>
            </div>
        </div>
    )
}