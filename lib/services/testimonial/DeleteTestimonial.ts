import db from "@/lib/lowdb/DB_Website";

export default function DeleteTestimonial(id: string): void {
  db.deleteTestimonial(id);
}
