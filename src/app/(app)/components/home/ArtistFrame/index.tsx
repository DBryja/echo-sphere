import "./artistFrame.scss";
import { Artist } from "@/payload-types";
import Image from "@components/Image";
import { getImageUrl, getImgAlt } from "@app/utils";
import Link from "@components/Link";

interface ArtistFrameProps {
  Artist: Artist;
  className?: string;
}

export default function AristFrame({
  Artist,
  className = "",
}: ArtistFrameProps) {
  return (
    <div className={"artist-frame " + className}>
      <Image
        className={"artist-frame__img"}
        src={getImageUrl(Artist["img-profile"])}
        alt={getImgAlt(Artist["img-profile"])}
        width={300}
        height={330}
      />
      <h3 className={"artist-frame__name"}>{Artist.name}</h3>
      <Link
        href={`/artists/${Artist.id}`}
        className={"artist-frame__cta"}
        aria-label={`View ${Artist.name}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5.5 11.75L18 11.75M18 11.75L12 17.75M18 11.75L12 5.75"
            stroke="#F2F2F2"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
}
