import TextQuery from "@/lib/mongoose/queries/TextQuery";

export const SchemaBodyUpdateIntroduction = {
  type: "object",
  additionalProperties: false,
  properties: {
    content: { type: "string" },
  },
  required: ["content"],
};

export default function UpdateIntroduction(content: string): Promise<boolean> {
  return TextQuery.updateIntroduction(content);
}
