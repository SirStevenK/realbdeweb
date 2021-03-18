import db from "@/lib/lowdb/DB_Website";
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
  testimonial: Omit<TestomonialElementProps, "id">
): void {
  db.addTestimonial(testimonial);
}
