import db from "@/lib/lowdb/DB_Website";
import { QuestionElementProps } from "@/types/utils";

export const SchemaBodyCreateQuestion = {
  type: "object",
  additionalProperties: false,
  properties: {
    question: { type: "string" },
    answer: { type: "string" },
  },
  required: ["question", "answer"],
};
export default function CreateQuestion(
  question: Omit<QuestionElementProps, "id">
): void {
  db.addQuestion(question);
}
