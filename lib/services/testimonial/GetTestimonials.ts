import TestimonialQuery from "@/lib/mongoose/queries/TestimonialQuery";
import { TestomonialElementProps } from "@/types/utils";

export default function GetTestimonials(): Promise<TestomonialElementProps[]> {
  return TestimonialQuery.getTestimonials();
}
