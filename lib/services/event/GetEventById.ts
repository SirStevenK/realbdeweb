import db from "@/lib/lowdb/DB_Website";
import { CalendarElementProps } from "@/types/utils";

export default function GetEventByID(
  id: string
): CalendarElementProps | undefined {
  return db.getEvent(id);
}
