import type { AboutUs } from "@/payload-types";
import { fetchAboutUsCopy } from "@utils/data";
import Image from "next/image";
import "./AboutUs.scss";

export const revalidate = 86400;

export default async function AboutUs() {
  const copyData = await fetchAboutUsCopy();

  return (
    <div className={"about-us__wrapper"}>
      <section className={"about-us__hero"}>
        <h1>ABOUT US</h1>
        <p>{copyData.heading}</p>
      </section>
      <section className={"about-us__origins"}>
        <h2>{copyData.origins?.origins_heading}</h2>
        <p>{copyData.origins?.origins_subheading}</p>
        <p>{copyData.origins?.origins_desc}</p>
        <div className={"about-us__origins__images"}>
          <Image
            width={512}
            height={512}
            // sizes="(max-width: 767px) 50vw, 33vw"
            src={"/img/about-us/polaroid_1.png"}
            alt={"Retro picture of musicians"}
          />
          <Image
            width={512}
            height={512}
            // sizes="(max-width: 767px) 50vw, 33vw"
            src={"/img/about-us/polaroid_2.png"}
            alt={"Retro picture of musicians"}
          />
        </div>
      </section>
      {/*<div className={"about-us__slider"}></div>*/}
      <section className={"about-us__values"}>
        <h2>{copyData.values?.values_heading}</h2>
        <p>{copyData.values?.values_desc1}</p>
        <p>{copyData.values?.values_desc2}</p>
        <div className={"about-us__values__image"}></div>
      </section>
      <section className={"about-us__about"}>
        <div className={"about-us__more"}>
          <p>More than room</p>
          <p>More than work</p>
          <p>It`s the people</p>
        </div>
      </section>
      <section className={"about-us__impact"}>
        <h2>Impact</h2>
        <h3>Not Fame</h3>
        <p>{copyData.summary?.summary_desc1}</p>
        <p>{copyData.summary?.summary_desc2}</p>
      </section>
    </div>
  );
}
