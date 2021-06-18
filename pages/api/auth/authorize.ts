import CheckSchema from "@/lib/ajv/CheckSchema";
import FindAdministrator from "@/lib/services/administrator/FindAdministrator";
import { NextApiHandler } from "next";

const route: NextApiHandler = async (req, res) => {
  const { method } = req;

  try {
    switch (method) {
      case "POST":
        if (CheckSchema(PostSchemaBody, req.body)) {
          const isAdmin = await FindAdministrator({
            email: (req.body.email as string).toLowerCase(),
          });
          if (isAdmin) res.status(200).end("OK");
          else throw new Error("KO");
        } else throw new Error("Bad Request");
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    if (e.message === "Bad Request") {
      res.status(400).end(`Bad Request`);
    } else if (e.message === "KO") {
      res.status(400).end(`KO`);
    } else {
      res.status(400).end(`Unknown Error`);
    }
  }
};

export const PostSchemaBody = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: { type: "string" },
  },
  required: ["email"],
};

export default route;
