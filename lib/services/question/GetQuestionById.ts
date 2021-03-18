import db from "@/lib/lowdb/DB_Website";
import { QuestionElementProps } from "@/types/utils";

export default function GetQuestionById(
  id: string
): QuestionElementProps | undefined {
  return db.getQuestion(id);
}
