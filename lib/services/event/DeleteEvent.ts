import db from "@/lib/lowdb/DB_Website";

export default function DeleteEvent(id: string): void {
  db.deleteEvent(id);
}
