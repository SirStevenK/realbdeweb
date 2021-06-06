import TestimonialQuery from "@/lib/mongoose/queries/TestimonialQuery";
import { TestomonialElementProps } from "@/types/utils";

export const SchemaBodyUpdateTestimonial = {
  type: "object",
  additionalProperties: false,
  properties: {
    content: { type: "string" },
    description: { type: "string" },
    image: { type: "string" },
    firstname: { type: "string" },
    lastname: { type: "string" },
  },
  required: ["content", "description", "image", "firstname", "lastname"],
};

export default function UpdateTestimonial(
  id: string,
  testimonial: TestomonialElementProps
): Promise<boolean> {
  return TestimonialQuery.updateTestimonial({ ...testimonial, _id: id });
}
