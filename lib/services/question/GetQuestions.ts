import QuestionQuery from "@/lib/mongoose/queries/QuestionQuery";
import { QuestionElementProps } from "@/types/utils";

export default function GetQuestions(): Promise<QuestionElementProps[]> {
  return QuestionQuery.getQuestions();
}
