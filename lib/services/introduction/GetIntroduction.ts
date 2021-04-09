import TextQuery from "@/lib/mongoose/queries/TextQuery";

export default function GetIntroduction(): Promise<string> {
  return TextQuery.getIntoduction();
}
