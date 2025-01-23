import { fetchEvents } from "@utils/data";
import { Media } from "@/payload-types";
import { Event } from "@/payload-types";
import "./eventsArchive.scss";
import EventsCarousel from "@components/events/EventsCarousel";
import { extractDate } from "@app/utils";
import ButtonsRow from "@components/shared/buttonsRow";

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
        <h3 className={"events__type-heading"}>CONCERTS</h3>
        {otherEvents.map((event, i) => {
          const { day, monthShorthand: month, time } = extractDate(event.date);
          return (
            <div key={i} className={"events__concert__item"}>
              <p className={"events__concert__item__date"}>
                <span className={"day"}>{day}</span>
                <span className={"month"}>{month}</span>
                <span className={"time"}>{time}</span>
              </p>
              <p className={"events__concert__item__title"}>{event.heading}</p>
              <p className={"events__concert__item__address"}>
                {event.address}
              </p>
              <ButtonsRow
                className={"events__concert__item__buttons"}
                primaryLink={event.links?.website}
                primaryText="About Event"
                secondaryLink={event.links?.tickets}
                secondaryText="Buy Tickets"
                reverse={true}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
}
