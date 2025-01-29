import { fetchAboutUsCopy } from "@utils/data";
import Image from "next/image";
import "./AboutUs.scss";
import HeroAnim from "@components/about-us/hero-anim";

export const revalidate = 86400;

export default async function AboutUs() {
  const copyData = await fetchAboutUsCopy();

  return (
    <div className={"about-us__wrapper"}>
      <section className={"about-us__hero"}>
        <div className={"about-us__hero__bg"}>
          <Image
            src={"/img/about-us/hero.png"}
            alt={
              "A picture of an empty, dark stage with a microphone and lights"
            }
            quality={100}
            fill
            sizes={"100vw"}
          />
        </div>
        <h1 className={"about-us__hero__heading"}>ABOUT US</h1>
        <p className={"about-us__hero__extra"}>{copyData.banner_copy}</p>
        <p className={"about-us__hero__desc"}>{copyData.heading}</p>
      </section>
      <HeroAnim />
      <section className={"about-us__origins"}>
        <h2 className={"about-us__origins__heading"}>
          {copyData.origins?.origins_heading}
        </h2>
        <p className={"about-us__origins__subheading"}>
          {copyData.origins?.origins_subheading}
        </p>
        <p className={"about-us__origins__desc"}>
          {copyData.origins?.origins_desc}
        </p>
        <div className={"about-us__origins__images"}>
          <div>
            <Image
              fill
              sizes="(max-width: 767px) 50vw, 33vw"
              src={"/img/about-us/polaroid_1.png"}
              alt={"Retro picture of musicians"}
            />
          </div>
          <div>
            <Image
              fill
              sizes="(max-width: 767px) 50vw, 33vw"
              src={"/img/about-us/polaroid_2.png"}
              alt={"Retro picture of musicians"}
            />
          </div>
        </div>
      </section>
      {/*<div className={"about-us__slider"}></div>*/}
      <section className={"about-us__values"}>
        <h2 className={"about-us__values__heading"}>
          {copyData.values?.values_heading}
        </h2>
        <p className={"about-us__values__desc"}>
          {copyData.values?.values_desc2}
        </p>
        <p className={"about-us__values__desc"}>
          {copyData.values?.values_desc1}
        </p>
        <div className={"about-us__values__image"}>
          <Image
            fill
            sizes={"100vw"}
            src={"/img/about-us/founders.png"}
            alt={"People in a circle"}
          />
        </div>
      </section>
      <section className={"about-us__studio"}>
        <h2 className={"about-us__studio__heading"}>OUR STUDIO</h2>
        <div className={"about-us__studio__banner"}>
          <p>More than room</p>
          <p>More than work</p>
          <p>It’s the people</p>
          <Image
            src={"/img/about-us/studio.png"}
            alt={"Studio"}
            fill
            sizes={"100vw"}
          />
        </div>
        <p className={"about-us__studio__desc"}>
          {copyData.about?.about_desc1}
        </p>
        <p className={"about-us__studio__desc"}>
          {copyData.about?.about_desc2}
        </p>
        <p className={"about-us__studio__slogan"}>It&apos;s the people</p>
        <div className={"about-us__studio__team"}>
          <Image
            src={"/img/about-us/team.png"}
            alt={"Studio"}
            fill
            sizes={"100vw"}
          />
        </div>
      </section>
      <section className={"about-us__impact"}>
        <div className={"about-us__impact__image"}>
          <Image
            src={"/img/about-us/hands-crowd.png"}
            alt={"Studio"}
            fill
            sizes={"100vw"}
          />
        </div>
        <div className={"about-us__impact__headers"}>
          <h2>Impact</h2>
          <h3>Not Fame</h3>
        </div>
        <div className={"about-us__impact__desc"}>
          <p>{copyData.summary?.summary_desc1}</p>
          <p>{copyData.summary?.summary_desc2}</p>
          <p>{copyData.summary?.summary_desc3}</p>
        </div>
      </section>
    </div>
  );
}
