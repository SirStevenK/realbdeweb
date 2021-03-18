import db from "@/lib/lowdb/DB_Website";

export default function GetIntroduction(): string {
  return db.getIntroduction();
}
