import db from "@/lib/lowdb/DB_Website";

export default function DeleteQuestion(id: string): void {
  db.deleteQuestion(id);
}
