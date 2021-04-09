import EventQuery from "@/lib/mongoose/queries/EventQuery";
import { CalendarElementProps } from "@/types/utils";

export default function GetEvents(): Promise<CalendarElementProps[]> {
  return EventQuery.getEvents();
}
