import Link from "next/link";
import Image from "@components/Image";
import ArtistsCarousel from "@components/artists/ArtistsCarousel";
import { fetchArtistsData } from "@utils/data";

export default async function Home() {
  const [artists] = await Promise.all([fetchArtistsData()]);
  return (
    <>
      <section className="home__hero">
        <span className={"home__hero__title home__hero__title--t1"}>
          listen to echoes
        </span>
        <span className={"home__hero__title home__hero__title--t2"}>of</span>
        <span className={"home__hero__title home__hero__title--t3"}>
          impact
        </span>
        <p className={"home__hero__desc"}>
          From breaking barriers to shaping new sounds, we empower unheard
          voices to become music revolutionaries.
        </p>
        <div className={"home__hero__decor"}>
          <span>MUSIC LABEL</span>
          <span>RECORD STUDIO</span>
        </div>
      </section>
      <section className="home__revolution">
        <h2 className={"home__revolution__title"}>
          Together, we are music revolutionaries
        </h2>
        <p className={"home__revolution__desc"}>
          In Echo Sphere, we support artists who define their generations and
          push creative boundaries.{" "}
        </p>
        <div className={"home__revolution__decor"}>
          <Image
            src={"/img/home/revolution.png"}
            fill
            sizes={"100vw"}
            alt={
              "a photo of a man performing on stage playing guitar and singing"
            }
          />
          <p className={"home__revolution__decor__text"}>
            <span>Music</span>
            <span>Revolution</span>
          </p>
        </div>
        <p className={"home__revolution__desc"}>
          In Echo Sphere, we support artists who define their generations and
          push creative boundaries.
        </p>
      </section>
      <section className={"home__us"}>
        <h2 className={"home__us__title"}>Who are we</h2>
        <p className={"home__us__desc"}>
          <span>
            We are a music label from Chicago, founded by former musicians who
            shared a vision to make music industry open to every creative soul.
            Fueled by our own struggles in career, we help artists turning their
            personal challenges into powerful music stories.
          </span>
          <span className={"hide-on-sm"}>
            Our core is guided by the values of equality, support, pioneering
            new directions, and making a real impact in building a better future
          </span>
        </p>
        <p className={"home__us__quote"}>
          “We knew firsthand the hardships of lacking financial resources,
          professional support, and technical skills, but our passion for music
          and helping others kept us going.”
        </p>
        <div className={"home__us__slider"}>
          {/* TODO: universal slider component for home and about-us*/}
        </div>
        {/*  TODO: CTA button*/}
      </section>
      <section className={"home__artists"}>
        <div className={"home__artists__frame"}>
          <h2 className={"home__artists__title"}>Our Artists</h2>
          <p className={"home__artists__desc"}>
            <span>
              Our label is about people who elevate creativity by facing and
              breaking life’s and music barriers.
            </span>
            <span>
              Music of our artist is like an echo, spreading fresh perspectives
              and impactful change.
            </span>
          </p>
          <p className={"home__artists__quote"}>
            “Each artist we work with is a collaborator in our mission to
            reshape the industry with values of equality, innovation, and true
            emotion.”
          </p>
          <div>
            <ArtistsCarousel artists={artists.docs} />
          </div>
        </div>
        {/*  TODO: CTA button*/}
      </section>
      <section className={"home__releases"}>
        <h2>New Releases</h2>
        {/*TODO: Fetch 3 latest releases and put them here*/}
        <div className={"home__releases__list"}></div>
        {/*  TODO: CTA button*/}
      </section>
      <section className={"home__events"}>
        <h2>New Releases</h2>
        <h3>Concerts</h3>
        <h3>&amp;TOURS</h3>
        {/*TODO: Fetch 3 latest events/concerts and put them here*/}
        <div className={"home__events__list"}></div>
        {/*  TODO: CTA button*/}
      </section>
      <section className={"home__impact"}>
        <h2 className={"home__impact__title hide-on-sm"}>
          Creating echoes of impact
        </h2>
        <p className={"home__impact__desc"}>
          We believe that music is a universal language that connects people
          regardless of their backgrounds or experiences.
        </p>
        <div className={"home__impact__bg"}>
          <Image
            src={"/img/home/microphone"}
            fill
            sizes={"100vw"}
            alt={"photo of a microphone in a music studio"}
          />
        </div>
        <p>echoes of impact</p>
      </section>
      <section className={"home__newsletter"}>
        <h2>NEWSLETTER</h2>
        <div className={"home__newsletter__form"}>
          <p>
            Don’t miss out! Receive emails about the latest releases, upcoming
            tours and careers of our artists.
          </p>
          <form>
            <input type={"email"} placeholder={"Enter your email"} />
            <input type={"submit"} value={"Subscribe"} />
          </form>
        </div>
      </section>
    </>
  );
}
