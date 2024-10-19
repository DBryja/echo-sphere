import Image from "next/image";

export type Socials = "facebook"|"instagram"|"youtube"|"spotify"|"tidal";
export interface SocialIconProps{
    href: string,
    social: Socials
}

export default function SocialIcon({href, social}:SocialIconProps){
    return <a href={href} target={"_blank"} rel={"noopener noreferrer"}>
        <Image src={`/img/socials/${social}.svg`} alt={social} width={48} height={48}/>
    </a>
}