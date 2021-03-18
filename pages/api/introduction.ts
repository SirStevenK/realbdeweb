import CheckSchema from "@/lib/ajv/CheckSchema";
import GetIntroduction from "@/lib/services/introduction/GetIntroduction";
import UpdateIntroduction, {
  SchemaBodyUpdateIntroduction,
} from "@/lib/services/introduction/UpdateIntroduction";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        res.status(200).end(GetIntroduction());
        break;
      case "POST":
        if (CheckSchema(SchemaBodyUpdateIntroduction, req.body)) {
          UpdateIntroduction(req.body.content);
          res.status(200).end();
          break;
        } else throw new Error("Bad Request");
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    if (e === "Bad Request") {
      res.status(400).end(`Bad Request`);
    } else {
      res.status(400).end(`Unknown`);
    }
  }
};
