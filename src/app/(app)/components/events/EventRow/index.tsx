import "./eventRow.scss";
import Button from "@components/buttons/deafult";
import Link from "@components/Link";
import { Event } from "@/payload-types";
import { extractDate } from "@app/utils";

interface EventRowProps {
  event: Event;
  className?: string;
}
export default function EventRow({
  event,
  className = "",
  ...rest
}: EventRowProps) {
  const { day, monthShorthand, time, month, year } = extractDate(event.date);
  return (
    <div {...rest} className={"event-row " + className}>
      <p className={"event-row__date"}>
        <span className={"fullDate"}>
          {day}/{month}/{year % 100}
        </span>
        <span className={"day"}>{day}</span>
        <span className={"month"}>{monthShorthand}</span>
        <span className={"time"}>{time}</span>
      </p>
      <p className={"event-row__title"}>{event.heading}</p>
      <p className={"event-row__address"}>{event.address}</p>
      <div className={"event-row__buttons"}>
        {event.links?.tickets && (
          <Button color={"black"}>
            <Link href={event.links.tickets}>BUY TICKETS</Link>
          </Button>
        )}
        {event.links?.website && (
          <Button color={"white"}>
            <Link href={event.links.website}>ABOUT EVENT</Link>
          </Button>
        )}
      </div>
    </div>
  );
}
