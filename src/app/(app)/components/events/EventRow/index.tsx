import type {Event} from "@/payload-types";
import Button from "@components/buttons/deafult";
import "./eventRow.scss";

function formatDate(dateStart: string, dateEnd?: string): string {
    const startDate = new Date(dateStart);
    const startDay = startDate.getDate();
    const startMonth = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const startYear = startDate.getFullYear() % 2000;

    if (!dateEnd) {
        return `${startDay}/${startMonth}/${startYear}`;
    }

    const endDate = new Date(dateEnd);
    const endDay = endDate.getDate();
    const endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0');
    const endYear = endDate.getFullYear() % 2000;

    if (startYear === endYear) {
        return `${startDay}.${startMonth}-${endDay}.${endMonth}/${startYear}`;
    } else {
        return `${startDay}.${startMonth}.${startYear}-${endDay}.${endMonth}.${endYear}`;
    }
}

export default function EventRow({event}: {event: Event}) {
    const {date, dateEnd, heading, subheading, links} = event;
    const formattedDate = dateEnd ? formatDate(date, dateEnd) : formatDate(date);
    const title = subheading ? subheading : heading;

    return (
        <div className="event-row">
            <div>
                <div className="event-row__date">{formattedDate}</div>
                <div className="event-row__title">{title}</div>
            </div>
            {links?.tickets && <Button className="event-row__button"><a href={links?.tickets}>Buy Tickets</a></Button>}
        </div>
    );
}