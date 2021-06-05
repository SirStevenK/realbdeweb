import SubscriberQuery from "@/lib/mongoose/queries/SubscriberQuery";
import { SubscriberProps } from "@/types/utils";

export default function GetSubscribers(): Promise<SubscriberProps[]> {
  return SubscriberQuery.getSubscribers();
}
