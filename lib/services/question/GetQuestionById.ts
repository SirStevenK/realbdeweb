import QuestionQuery from "@/lib/mongoose/queries/QuestionQuery";
import { QuestionElementProps } from "@/types/utils";

export default function GetQuestionById(
  id: string
): Promise<QuestionElementProps | undefined> {
  return QuestionQuery.getQuestion(id);
}
