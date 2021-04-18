import AdministratorQuery from "@/lib/mongoose/queries/AdministratorQuery";
import { AdministratorElementProps } from "@/types/utils";

export default function FindAdministrator(
  filter: Partial<AdministratorElementProps>
): Promise<AdministratorElementProps | undefined> {
  return AdministratorQuery.findAdministrator(filter);
}
