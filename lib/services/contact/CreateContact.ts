import ContactQuery from "@/lib/mongoose/queries/ContactQuery";
import { ContactProps } from "@/types/utils";

export default function CreateContact(
  contact: ContactProps
): Promise<string | undefined> {
  return ContactQuery.addContact(contact);
}
