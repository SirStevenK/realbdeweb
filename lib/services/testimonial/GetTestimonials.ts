import db from "@/lib/lowdb/DB_Website";
import { TestomonialElementProps } from "@/types/utils";

export default function GetTestimonials(): TestomonialElementProps[] {
  return db.getTestimonials();
}
