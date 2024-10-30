import Image from "@components/Image";
import "./socialIcon.scss";

export type Socials = "facebook"|"instagram"|"youtube"|"spotify"|"tidal";
export interface SocialIconProps{
    href: string,
    social: Socials
}

export default function Index({href, social}:SocialIconProps){
    return <a href={href} target={"_blank"} rel={"noopener noreferrer"} className={"social-icon"}>
        <Image src={`/img/socials/${social}.svg`} alt={social} width={80} height={80}/>
    </a>
}