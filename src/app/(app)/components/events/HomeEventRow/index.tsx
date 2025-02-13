import { Event } from "@/payload-types";
import Button from "@components/buttons/deafult";
import { extractDate, extractAddress } from "@app/utils";
import "./homeEventRow.scss";

interface HomeEventRowProps {
  event: Event;
  className?: string;
}
export default function HomeEventRow({
  event,
  className = "",
  ...rest
}: HomeEventRowProps) {
  const { day, month, year } = extractDate(event.date);
  const { city, stateAbbr } = extractAddress(event.address as string);
  return (
    <div {...rest} className={"home-event-row " + className}>
      <p className={"home-event-row__date"}>
        {`${day}/${month}/${year % 1000}`}
      </p>
      <div className={"home-event-row__details"}>
        <h3 className={"home-event-row__details__name"}>{event.heading}</h3>
        <p className={"home-event-row__details__address"}>
          {`${stateAbbr}, ${city}`}
        </p>
      </div>
      <Button color={"white"}>
        <a href={event.links?.tickets as string | undefined}>BUY TICKETS</a>
      </Button>
    </div>
  );
}
