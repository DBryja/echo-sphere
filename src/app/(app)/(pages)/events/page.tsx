import { fetchEvents } from "@utils/data";
import { Media } from "@/payload-types";
import { Event } from "@/payload-types";
import "./eventsArchive.scss";
import EventsCarousel from "@components/events/EventsCarousel";
import Image from "next/image";
import ScrollBanner from "@components/events/ScrollBanner";
import EventRow from "@components/events/EventRow";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Echo Sphere",
  description: "Discover the latest events organized by Echo Sphere, including festivals, tours, and concerts that are sure to captivate you."
};

export const revalidate = 86400;

export interface EventWithCover extends Omit<Event, "img-poster"> {
  "img-poster": Media | string;
  subheading: string;
}
function hasImgPoster(event: Event): event is EventWithCover {
  return event["img-poster"] !== undefined && event["img-poster"] !== null;
}

export default async function Events() {
  const events = await fetchEvents();
  const eventsWithCover = events.filter(
    (event): event is EventWithCover =>
      event.type !== "concert" && hasImgPoster(event),
  );
  const otherEvents = events.filter((event) => event.type === "concert");

  return (
    <div className={"events__wrapper"}>
      <h1 id="events__title" className={"events__heading"}>
        EVENTS
      </h1>
      <div id="events__banner" className={"events__banner"}>
        <Image
          src="/img/events-banner.webp"
          alt="Concert crowd"
          fill
          sizes="100vw"
        />
        <ScrollBanner bannerId={"events__banner"} titleId={"events__title"} />
      </div>
      <h3 className={"events__type-heading events__type-heading--festivals"}>
        <span>FESTIVALS</span>
        <span>&TOURS</span>
      </h3>
      <section className={"events__cover__wrapper events__cover"}>
        <EventsCarousel events={eventsWithCover} />
      </section>
      <section className={"events__concert__wrapper events__concert"}>
        <h3 className={"events__type-heading events__type-heading--concerts"}>
          CONCERTS
        </h3>
        {otherEvents.map((event, i) => (
          <EventRow event={event} key={i} />
        ))}
      </section>
    </div>
  );
}
