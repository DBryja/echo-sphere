import "./menu.scss";
import type {ContactDatum} from "@/payload-types";

export default function Menu({isOpen, contactData}:{isOpen:boolean, contactData: ContactDatum}) {
    const {email, "phone-number":phoneNumber,address, socials } = contactData;

    return (
        <section className={`menu ${isOpen?"active":""}`}>
            <div>
                MENU
            </div>
            <p>{email}</p>
            <p>{phoneNumber}</p>
            <p>{address}</p>
            <div>
                {socials?.facebook && <a href={socials.facebook}>Facebook</a>}
                {socials?.instagram && <a href={socials.instagram}>Instagram</a>}
                {socials?.youtube && <a href={socials.youtube}>Youtube</a>}
            </div>
        </section>
    )
}

