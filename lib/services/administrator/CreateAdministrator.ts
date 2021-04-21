import AdministratorQuery from "@/lib/mongoose/queries/AdministratorQuery";
import { AdministratorElementProps } from "@/types/utils";

export default function CreateAdministrator(
  administrator: AdministratorElementProps
): Promise<boolean> {
  return AdministratorQuery.addAdministrator(administrator);
}
