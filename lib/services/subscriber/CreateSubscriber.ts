import SubscriberQuery from "@/lib/mongoose/queries/SubscriberQuery";
import { SubscriberProps } from "@/types/utils";

export default function CreateSubscriber(
  subscriber: SubscriberProps
): Promise<boolean | undefined> {
  return SubscriberQuery.addSubscriber(subscriber);
}
