import QuestionQuery from "@/lib/mongoose/queries/QuestionQuery";

export default function DeleteQuestion(id: string): Promise<boolean> {
  return QuestionQuery.deleteQuestion(id);
}
