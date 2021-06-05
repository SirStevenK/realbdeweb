import ContactQuery from "@/lib/mongoose/queries/ContactQuery";

export default function DeleteContact(id: string): Promise<boolean> {
  return ContactQuery.deleteContact(id);
}
