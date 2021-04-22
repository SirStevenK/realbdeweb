import EmailQuery from "@/lib/mongoose/queries/EmailQuery";
import { EmailProps } from "@/types/utils";

export default function GetEmails(): Promise<EmailProps[]> {
  return EmailQuery.getEmails();
}
