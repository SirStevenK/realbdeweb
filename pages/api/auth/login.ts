import CheckSchema from "@/lib/ajv/CheckSchema";
import SetLoginSession from "@/lib/auth/SetLoginSession";
import { magic } from "@/lib/magic/magic";
import AdministratorQuery from "@/lib/mongoose/queries/AdministratorQuery";
import { NextApiHandler } from "next";

const route: NextApiHandler = async (req, res) => {
  const { method } = req;

  try {
    switch (method) {
      case "POST":
        if (CheckSchema(PostSchemaBody, req.body)) {
          const adminDocument = await AdministratorQuery.findAdministrator({
            email: (req.body.email as string).toString(),
          });

          if (adminDocument) {
            const didToken = req.headers.authorization?.substring(7);
            const metadata = await magic.users.getMetadataByToken(
              didToken as string
            );
            const session = { ...metadata };

            await SetLoginSession(res, session);

            res.status(200).send({ done: true });
          } else throw new Error("Not Found");
        } else throw new Error("Bad Request");
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    if (e.message === "Bad Request") {
      res.status(400).end(`Bad Request`);
    } else if (e.message === "Not Found") {
      res.status(400).end(`Not Found`);
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
