import QuestionQuery from "@/lib/mongoose/queries/QuestionQuery";
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
  question: QuestionElementProps
): Promise<boolean> {
  return QuestionQuery.updateQuestion({ ...question, _id: id });
}
