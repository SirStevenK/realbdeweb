import ContactQuery from "@/lib/mongoose/queries/ContactQuery";
import { ContactProps } from "@/types/utils";

export default function GetContacts(): Promise<ContactProps[]> {
  return ContactQuery.getContacts();
}
