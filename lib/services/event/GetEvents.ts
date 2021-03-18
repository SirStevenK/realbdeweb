import db from "@/lib/lowdb/DB_Website";
import { CalendarElementProps } from "@/types/utils";

export default function GetEvents(): CalendarElementProps[] {
  return db.getEvents();
}
