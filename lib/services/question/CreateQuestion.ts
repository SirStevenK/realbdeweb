import QuestionQuery from "@/lib/mongoose/queries/QuestionQuery";
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
  question: QuestionElementProps
): Promise<boolean> {
  return QuestionQuery.addQuestion(question);
}
