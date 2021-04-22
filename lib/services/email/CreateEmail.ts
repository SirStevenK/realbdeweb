import EmailQuery from "@/lib/mongoose/queries/EmailQuery";
import { EmailProps } from "@/types/utils";

export const SchemaBodyCreateEmail = {
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

export default function CreateEmail(
  email: EmailProps
): Promise<string | undefined> {
  return EmailQuery.addEmail(email);
}
