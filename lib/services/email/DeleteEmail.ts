import EmailQuery from "@/lib/mongoose/queries/EmailQuery";

export default function DeleteEmail(id: string): Promise<boolean> {
  return EmailQuery.deleteEmail(id);
}
