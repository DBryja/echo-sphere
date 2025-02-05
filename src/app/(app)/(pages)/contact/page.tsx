import { fetchContactData } from "@utils/data";
import type { ContactDatum } from "@/payload-types";
import SocialIcon from "@components/shared/socialIcon";
import type { Socials } from "@components/shared/socialIcon";
import "./Contact.scss";
import Image from "@components/Image";
import Input from "@components/shared/Input";
import ArrowIcon from "@components/shared/ArrowIcon";
import HideArrowAnim from "@components/shared/ArrowIcon/hideArrow-anim";

const escapeContactData = (data: string | ContactDatum["socials"]) => {
  if (typeof data === "string") return data;
  if (!data) return null;
  return Object.entries(data).map(([key, value]) => {
    return key && value ? (
      <SocialIcon href={value} social={key as Socials} key={key} />
    ) : null;
  });
};

type ContactPair = [string, string | ContactDatum["socials"]];
export default async function Contact() {
  const {
    email,
    "phone-number": phoneNumber,
    address,
    socials,
  } = await fetchContactData();
  const contactPairs = [
    ["e-mail address", email],
    ["phone number", phoneNumber],
    ["address", address],
    ["socials", socials],
  ] as ContactPair[];
  return (
    <div className={"contact__wrapper"}>
      <section className={"contact__form"}>
        <div className={"contact__form__decor"}>
          <div className={"contact__form__decor__bg"}>
            <Image
              className={"about-us__studio__banner__image"}
              src={"/img/about-us/studio.png"}
              alt={"Studio"}
              fill
              sizes={"(max-width: 1024px) 80vw, 50vw"}
            />
          </div>
          <div className={"contact__form__decor__team"}>
            <Image
              src={"/img/about-us/team.png"}
              alt={"Studio"}
              fill
              sizes={"(max-width: 1024px) 50vw, 30vw"}
            />
          </div>
          <h1>CONTACT</h1>
        </div>
        <div className={"contact__form__heading"}>
          <p className={"hide-on-md"}>feel free to reach out to us anytime.</p>
          <p className={"hide-on-sm"}>
            If you need help or advice, feel free to reach out to us anytime.
            We&apos;re always open to conversations and eager to hear your
            stories.
          </p>
        </div>
        <form className={"contact__form__form"}>
          <Input
            type={"text"}
            label={"Full Name"}
            placeholder={"enter your name"}
          />
          <Input
            type={"email"}
            label={"Email"}
            placeholder={"enter your email"}
          />
          <Input
            inputType={"textarea"}
            label={"Message"}
            placeholder={"enter your message"}
          />
          <Input
            type={"submit"}
            value={"send message"}
            wrapperClassName={"submit"}
          />
          <div className={"contact__form__form__arrow contact__form__arrow"}>
            <ArrowIcon />
            <HideArrowAnim selector={".contact__form__form__arrow"} />
          </div>
        </form>
      </section>
      <section className={"contact__data"}>
        {contactPairs.map(([title, value]) => {
          return (
            <div className={"contact__data__row"} key={title}>
              <div className={"contact__data__row__title"}>{title}</div>
              <p
                className={`contact__data__row__item  contact__data__row__item--${title}`}
              >
                {escapeContactData(value)}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
