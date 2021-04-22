import EmailQuery from "@/lib/mongoose/queries/EmailQuery";
import { EmailProps } from "@/types/utils";

export const SchemaBodyUpdateEmail = {
  type: "object",
  additionalProperties: false,
  properties: {
    content: {
      type: "object",
      additionalProperties: true,
      properties: {
        blocks: { type: "array" },
      },
      required: ["blocks"],
    },
    title: { type: "string" },
    to: { type: "string" },
  },
  required: ["content", "title", "to"],
};

export default function UpdateEmail(
  id: string,
  email: EmailProps
): Promise<boolean> {
  return EmailQuery.updateEmail({ ...email, _id: id });
}
