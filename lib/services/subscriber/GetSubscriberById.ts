import SubscriberQuery from "@/lib/mongoose/queries/SubscriberQuery";
import { SubscriberProps } from "@/types/utils";

export default function GetSubscriberById(
  id: string
): Promise<SubscriberProps | undefined> {
  return SubscriberQuery.getSubscriber(id);
}
