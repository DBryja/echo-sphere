"use client";
import { EventWithCover } from "@app/(pages)/events/page";
import DraggableCarousel from "@components/draggableCarousel";
import "./eventsCarousel.scss";
import Image from "@components/Image";
import { getImageUrl, getImgAlt } from "@app/utils";
import ButtonsRow from "@components/shared/buttonsRow";

export default function EventsCarousel({
  events,
  className = "",
}: {
  events: EventWithCover[];
  className?: string;
}) {
  const slides = events.map((event, i) => ({
    id: i,
    content: (
      <div key={i} className={"events__cover__item"}>
        <Image
          className={"events__cover__item__img"}
          src={getImageUrl(event["img-poster"])}
          alt={getImgAlt(event["img-poster"])}
          width={280}
          height={350}
        />
        <span className={"events__cover__item__type"}>{event.type}</span>
        <div className={"events__cover__item__info"}>
          <h2>{event.heading}</h2>
          <h3>{event.subheading}</h3>
        </div>
        <ButtonsRow
          className={"events__cover__item__buttons"}
          primaryLink={event.links?.website}
          primaryText="About Event"
          secondaryLink={event.links?.tickets}
          secondaryText="Buy Tickets"
        />
      </div>
    ),
  }));

  return (
    <DraggableCarousel
      slides={slides}
      freeMode={false}
      slidesPerView={1}
      loop={false}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 2.05,
        },
        1600: {
          slidesPerView: 3.1,
        },
      }}
      className={`events-carousel ${className}`}
    />
  );
}
