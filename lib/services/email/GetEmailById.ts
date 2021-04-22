import EmailQuery from "@/lib/mongoose/queries/EmailQuery";
import { EmailProps } from "@/types/utils";

export default function GetEmailByID(
  id: string
): Promise<EmailProps | undefined> {
  return EmailQuery.getEmail(id);
}
