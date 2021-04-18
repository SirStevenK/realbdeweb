import EventQuery from "@/lib/mongoose/queries/EventQuery";
import { CalendarElementProps } from "@/types/utils";

export const SchemaBodyCreateEvent = {
  type: "object",
  additionalProperties: false,
  properties: {
    date: { type: "string" },
    name: { type: "string" },
  },
  required: ["date", "name"],
};

export default function CreateEvent(
  event: CalendarElementProps
): Promise<boolean> {
  return EventQuery.addEvent(event);
}
