import db from "@/lib/lowdb/DB_Website";
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
  event: Omit<CalendarElementProps, "id">
): void {
  db.updateEvent({ id, ...event });
}
