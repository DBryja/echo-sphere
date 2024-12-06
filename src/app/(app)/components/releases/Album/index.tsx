import type { Release} from "@/payload-types";
import Image from "@components/Image";
import {getImageUrl, getImgAlt} from "@app/utils";

export default async function Album({item, big}:{item:Release, big?:boolean}){

    return (
        <div className={`releases__album`}>
            <Image
                src={getImageUrl(item["img-cover"])}
                alt={getImgAlt(item["img-cover"])}
                width={big?512:256}
                height={big?512:256}
            />
            <div className={"releases__album__details"}>
                <h4 className="authors">{item.authors}</h4>
                <p className="title">{item.name}</p>
                <p className={"date"}>{new Date(item["release-date"]).getUTCFullYear()}</p>
            </div>
        </div>
    )
}