import db from "@/lib/lowdb/DB_Website";

export const SchemaBodyUpdateIntroduction = {
  type: "object",
  additionalProperties: false,
  properties: {
    content: { type: "string" },
  },
  required: ["content"],
};

export default function UpdateIntroduction(content: string): void {
  db.updateIntroduction(content);
}
