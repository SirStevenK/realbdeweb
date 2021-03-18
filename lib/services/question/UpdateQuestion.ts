import db from "@/lib/lowdb/DB_Website";
import { QuestionElementProps } from "@/types/utils";

export const SchemaBodyUpdateQuestion = {
  type: "object",
  additionalProperties: false,
  properties: {
    question: { type: "string" },
    answer: { type: "string" },
  },
  required: ["question", "answer"],
};
export default function UpdateQuestion(
  id: string,
  event: Omit<QuestionElementProps, "id">
): void {
  db.updateQuestion({ id, ...event });
}
