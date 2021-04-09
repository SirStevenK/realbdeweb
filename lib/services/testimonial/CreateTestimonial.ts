import TestimonialQuery from "@/lib/mongoose/queries/TestimonialQuery";
import { TestomonialElementProps } from "@/types/utils";

export const SchemaBodyCreateTestimonial = {
  type: "object",
  additionalProperties: false,
  properties: {
    content: { type: "string" },
    description: { type: "string" },
    firstname: { type: "string" },
    lastname: { type: "string" },
  },
  required: ["content", "description", "firstname", "lastname"],
};

export default function CreateTestimonial(
  testimonial: TestomonialElementProps
): Promise<boolean> {
  return TestimonialQuery.addTestimonial(testimonial);
}
