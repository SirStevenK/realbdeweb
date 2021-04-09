import EventQuery from "@/lib/mongoose/queries/EventQuery";

export default function DeleteEvent(id: string): Promise<boolean> {
  return EventQuery.deleteEvent(id);
}
