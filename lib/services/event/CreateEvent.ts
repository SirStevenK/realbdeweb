import db from "@/lib/lowdb/DB_Website";
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
  event: Omit<CalendarElementProps, "id">
): void {
  db.addEvent(event);
}
