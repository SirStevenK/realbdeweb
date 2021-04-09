import EventQuery from "@/lib/mongoose/queries/EventQuery";
import { CalendarElementProps } from "@/types/utils";

export const SchemaBodyUpdateEvent = {
  type: "object",
  additionalProperties: false,
  properties: {
    date: { type: "string" },
    name: { type: "string" },
  },
  required: ["date", "name"],
};
export default function UpdateEvent(
  id: string,
  event: CalendarElementProps
): Promise<boolean> {
  return EventQuery.updateEvent({ ...event, _id: id });
}
