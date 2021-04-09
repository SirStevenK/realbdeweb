import EventQuery from "@/lib/mongoose/queries/EventQuery";
import { CalendarElementProps } from "@/types/utils";

export default function GetEventByID(
  id: string
): Promise<CalendarElementProps | undefined> {
  return EventQuery.getEvent(id);
}
