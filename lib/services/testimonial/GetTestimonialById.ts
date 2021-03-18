import db from "@/lib/lowdb/DB_Website";
import { TestomonialElementProps } from "@/types/utils";

export default function GetTestimonialById(
  id: string
): TestomonialElementProps | undefined {
  return db.getTestimonial(id);
}
