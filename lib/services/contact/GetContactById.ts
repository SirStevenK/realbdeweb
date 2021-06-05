import ContactQuery from "@/lib/mongoose/queries/ContactQuery";
import { ContactProps } from "@/types/utils";

export default function GetContactById(
  id: string
): Promise<ContactProps | undefined> {
  return ContactQuery.getContact(id);
}
