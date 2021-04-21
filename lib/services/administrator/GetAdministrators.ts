import AdministratorQuery from "@/lib/mongoose/queries/AdministratorQuery";
import { AdministratorElementProps } from "@/types/utils";

export default function GetAdministrators(): Promise<
  AdministratorElementProps[]
> {
  return AdministratorQuery.getAdministrators();
}
