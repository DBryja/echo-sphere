import Icon, { Socials } from "@components/shared/socialIcon";
import React from "react";
import { Release } from "@/payload-types";
import "./streamingLinks.scss";

interface StreamingLinksProps {
  links: Release["links"];
  className?: string;
  red?: boolean;
}
export default function StreamingLinks({
  links,
  className = "",
  red = true,
}: StreamingLinksProps) {
  return (
    <div className={"streaming-links " + className}>
      {links &&
        Object.entries(links).map(
          ([key, value]) =>
            value && (
              <Icon href={value} social={key as Socials} key={key} red={red} />
            ),
        )}
    </div>
  );
}
