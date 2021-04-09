import TestimonialQuery from "@/lib/mongoose/queries/TestimonialQuery";

export default function DeleteTestimonial(id: string): Promise<boolean> {
  return TestimonialQuery.deleteTestimonial(id);
}
