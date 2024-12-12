import Image from "@components/Image";
import "./socialIcon.scss";

export type Socials =
  | "facebook"
  | "instagram"
  | "youtube"
  | "spotify"
  | "tidal";
export interface SocialIconProps {
  href: string;
  social: Socials;
  red?: boolean;
}

export default function Index({ href, social, red }: SocialIconProps) {
  return (
    <a
      href={href}
      target={"_blank"}
      rel={"noopener noreferrer"}
      className={`social-icon ${red ? "social-icon--red" : ""}`}
    >
      <Image
        src={`/img/socials/${red ? "red/" : ""}${social}.svg`}
        alt={social}
        width={80}
        height={80}
      />
    </a>
  );
}
