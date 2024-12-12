import type { Release } from "@/payload-types";
import Image from "@components/Image";
import { getImageUrl, getImgAlt } from "@app/utils";
import Icon, { Socials } from "@components/shared/socialIcon";
import React from "react";

export default async function Album({
  item,
  big,
}: {
  item: Release;
  big?: boolean;
}) {
  const currentDate = new Date(item["release-date"]).getUTCFullYear();

  return (
    <div className={`releases__album`}>
      <Image
        src={getImageUrl(item["img-cover"])}
        alt={getImgAlt(item["img-cover"])}
        width={big ? 512 : 256}
        height={big ? 512 : 256}
      />
      <div className={"releases__album__details"}>
        <h4 className="authors">{item.authors}</h4>
        <p className="title">
          {item.name}
          {big ? ", " + currentDate : ""}
        </p>
        {!big && <p className={"date"}>{currentDate}</p>}
      </div>
      {big && (
        <div className={"releases__album__links"}>
          <p>LISTEN ON:</p>
          <div>
            {item.links &&
              Object.entries(item.links).map(
                ([key, value]) =>
                  value && (
                    <Icon href={value} social={key as Socials} key={key} red />
                  ),
              )}
          </div>
          <span className={"decor"} />
        </div>
      )}
    </div>
  );
}
