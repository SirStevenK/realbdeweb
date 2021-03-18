import ajv, { SchemaObject } from "ajv";

const _ajv = new ajv();

export default function CheckSchema(
  schema: string | boolean | SchemaObject,
  data: unknown
): boolean {
  return _ajv.validate(schema, data);
}
