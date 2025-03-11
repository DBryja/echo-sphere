import Link from "next/link";
import Image from "@components/Image";
import ArtistsCarousel from "@components/artists/ArtistsCarousel";
import ArtistFrame from "@components/home/ArtistFrame";
import {
  fetchArtistsData,
  fetchEvents,
  fetchLatestReleases,
} from "@utils/data";
import "./Homepage.scss";
import ReleaseRow from "@components/home/ReleaseRow";
import EventRow from "src/app/(app)/components/events/EventRow";
import HomeEventRow from "@components/events/HomeEventRow";

export const revalidate = 86400;
const ARTISTS_PER_PAGE = 3;
export default async function Home() {
  const [artists, releases, events] = await Promise.all([
    fetchArtistsData(),
    fetchLatestReleases(),
    fetchEvents(4, "concert"),
  ]);
  return (
    <>
      <section className="home__hero">
        <div className={"home__hero__bg"}>
          <Image
            src={"/img/home/hero.png"}
            fill
            sizes={"100vw"}
            alt={"a photo of a woman on stage singing"}
          />
        </div>
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
        <h2 className={"home__revolution__title hide-on-md"}>
          <span>Together,</span>
          <span>we are music</span>
          <span>revolutionaries</span>
        </h2>
        <h2 className={"home__revolution__title hide-on-sm"}>
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
            <span className={"hide-on-md"}>Revolution</span>
            <span className={"hide-on-sm"}>Revolutionaries</span>
          </p>
        </div>
      </section>
      <section className={"home__us"}>
        <h2 className={"home__us__title"}>Who are we</h2>
        <div className={"home__us__desc"}>
          <p>
            We are a <b>music label</b> from <b>Chicago</b>, founded by former
            musicians who shared a vision to make music industry open to every
            creative soul. Fueled by our own struggles in career, we help
            artists turning their personal challenges into powerful music
            stories.
          </p>
          <p className={"hide-on-sm"}>
            Our core is guided by the values of equality, support, pioneering
            new directions, and making a real impact in building a better future
          </p>
        </div>
        <p className={"home__us__quote"}>
          “We knew firsthand the hardships of lacking financial resources,
          professional support, and technical skills, but our passion for music
          and helping others kept us going.”
        </p>
        <div className={"home__us__image"}>
          <Image
            src={"/img/home/house.jpg"}
            alt={"a photo of a brick house"}
            fill
            sizes={"(max-width: 768px) 450px, 40vw"}
          />
        </div>
        <Link href={"/about-us"} className={"home__us__cta cta-button"}>
          See our history
        </Link>
      </section>
      <section className={"home__artists hide-on-sm"}>
        <h2 className={"home__artists__title"}>Our Artists</h2>
        <div className={"home__artists__desc"}>
          <p>
            Our label is about people who elevate creativity by facing and
            breaking life’s and music barriers.
          </p>
          <p>
            Music of our artist is like an echo, spreading fresh perspectives
            and impactful change.
          </p>
        </div>
        <p className={"home__artists__quote"}>
          “Each artist we work with is a collaborator in our mission to reshape
          the industry with values of equality, innovation, and true emotion.”
        </p>
        <ArtistsCarousel
          artists={artists.docs}
          className={"home__artists__carousel"}
          slidesPerView={2.5}
          breakpoints={{
            767: { slidesPerView: 3.3 },
            1024: { slidesPerView: 4.1 },
            1921: { slidesPerView: 5.1 },
          }}
        />
        <Link href={"/artists"} className={"home__artists__cta cta-button"}>
          Meet echo artists
        </Link>
      </section>
      <section className={"home__artists hide-on-md"}>
        <h2 className={"home__artists__title"}>Our Artists</h2>
        <p className={"home__artists__quote"}>
          “Each artist we work with is a collaborator in our mission to reshape
          the industry with values of <b>equality</b>, <b>innovation</b>, and{" "}
          <b>true emotion</b>.”
        </p>
        <>
          {artists.docs.slice(0, ARTISTS_PER_PAGE).map((artist) => (
            <ArtistFrame key={artist.id} Artist={artist} />
          ))}
        </>
        <Link href={"/artists"} className={"home__artists__cta cta-button"}>
          Meet echo artists
        </Link>
      </section>
      <section className={"home__releases"}>
        <h2 className={"home__releases__title"}>New Releases</h2>
        <div className={"home__releases__list"}>
          {releases.map((release) => (
            <ReleaseRow
              key={release.id}
              release={release}
              className={"home__releases__list__item"}
            />
          ))}
        </div>
        <Link href={"/releases"} className={"home__releases__cta cta-button"}>
          <span className={"hide-on-sm"} style={{ color: "inherit" }}>
            CHECK&nbsp;
          </span>
          Latest Releases
        </Link>
      </section>
      <section className={"home__events max-xl"}>
        <h2 className={"home__events__title"}>Upcoming events</h2>
        <div className={"home__events__list"}>
          {events.map((event, i) => {
            const isHidden = events.length > 3 && i >= 3;
            const isLastVisible =
              events.length >= 3 ? i === 2 : i === events.length - 1;
            return (
              <EventRow
                key={event.id}
                event={event}
                className={`${isHidden ? "mobile-hidden" : ""} ${isLastVisible ? "last-visible" : ""}`}
              />
            );
          })}
        </div>
        <Link href={"/events"} className={"home__events__cta cta-button"}>
          <span className={"hide-on-sm"} style={{ color: "inherit" }}>
            SEE&nbsp;
          </span>
          MORE
          <span className={"hide-on-sm"} style={{ color: "inherit" }}>
            &nbsp;UPCOMING
          </span>
            &nbsp;EVENTS
        </Link>
      </section>
      <section className={"home__events min-xl"}>
        <div className={"home__events__list"}>
          <h2>Concerts</h2>
          <h2>&amp;TOURS</h2>
          {events.map((event) => (
            <HomeEventRow
              key={event.id}
              event={event}
              className={"home__events__list__item"}
            />
          ))}
        </div>
        <Link href={"/events"} className={"home__events__cta cta-button"}>
          SEE MORE UPCOMING EVENTS
        </Link>
      </section>
      <section className={"home__impact"}>
        <h3 className={"home__impact__title"}>
          Creating echoes of impact
        </h3>
        <p className={"home__impact__desc"}>
          We believe that music is a universal language that connects people
          regardless of their backgrounds or experiences.
        </p>
        <div className={"home__impact__bg"}>
          <Image
            src={"/img/home/microphone.png"}
            fill
            sizes={"100vw"}
            alt={"photo of a microphone in a music studio"}
          />
          <p>Echoes <span>of impact</span></p>
        </div>
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
