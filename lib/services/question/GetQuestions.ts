import db from "@/lib/lowdb/DB_Website";
import { QuestionElementProps } from "@/types/utils";

export default function GetQuestions(): QuestionElementProps[] {
  return db.getQuestions();
}
