import AdministratorQuery from "@/lib/mongoose/queries/AdministratorQuery";

export default function DeleteAdministrator(id: string): Promise<boolean> {
  return AdministratorQuery.deleteAdministrator(id);
}
