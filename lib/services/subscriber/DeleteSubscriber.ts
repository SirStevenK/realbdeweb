import SubscriberQuery from "@/lib/mongoose/queries/SubscriberQuery";

export default function DeleteSubscriber(id: string): Promise<boolean> {
  return SubscriberQuery.deleteSubscriber(id);
}
