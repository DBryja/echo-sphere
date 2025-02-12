import React from "react";
import { Release } from "@/payload-types";
import Image from "@components/Image";
import { extractDate, getImageUrl, getImgAlt } from "@app/utils";
import "./releaseRow.scss";
import StreamingLinks from "@components/shared/StreamingLinks";

interface ReleaseRowProps extends React.HTMLAttributes<HTMLDivElement> {
  release: Release;
}
export default function ReleaseRow({ release, ...rest }: ReleaseRowProps) {
  return (
    <div {...rest} className={`release-row ${rest.className}`}>
      <Image
        className={"release-row__img"}
        src={getImageUrl(release["img-cover"])}
        alt={getImgAlt(release["img-cover"])}
        width={128}
        height={128}
      />
      <h4 className={"release-row__title"}>{release.name}</h4>
      <h3 className={"release-row__name"}>{release.authors}</h3>
      <p className={"release-row__prod"}>
        ECHO SPHERE PRODUCTIONS, {extractDate(release["release-date"]).year}
      </p>
      <StreamingLinks
        links={release.links}
        red={false}
        className={"release-row__links"}
      />
    </div>
  );
}
