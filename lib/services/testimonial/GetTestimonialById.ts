import TestimonialQuery from "@/lib/mongoose/queries/TestimonialQuery";
import { TestomonialElementProps } from "@/types/utils";

export default function GetTestimonialById(
  id: string
): Promise<TestomonialElementProps | undefined> {
  return TestimonialQuery.getTestimonial(id);
}
