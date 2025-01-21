import { fetchEvents } from "@utils/data";
import { Media } from "@/payload-types";
import { Event } from "@/payload-types";
import "./eventsArchive.scss";
import EventsCarousel from "@components/events/EventsCarousel";

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
      {/*<div className={"events__banner"}></div>*/}
      <h1 className={"events__heading"}>EVENTS</h1>
      <section className={"events__cover__wrapper events__cover"}>
        <EventsCarousel events={eventsWithCover} />
      </section>
      <section className={"events__concert__wrapper events__concert"}>
        {otherEvents.map((event, i) => (
          <div key={i} className={"events__concert__item"}>
            <p>{event.address}</p>
            <p>{event.subheading}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
