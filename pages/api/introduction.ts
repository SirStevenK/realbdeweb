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
        res.status(200).end(await GetIntroduction());
        break;
      case "PUT":
        if (CheckSchema(SchemaBodyUpdateIntroduction, req.body)) {
          const done = UpdateIntroduction(req.body.content);
          if (done) res.status(200).end();
          else throw "Failed";
          break;
        } else throw new Error("Bad Request");
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    if (e === "Bad Request") {
      res.status(400).end(`Bad Request`);
    } else if (e === "Failed") {
      res.status(400).end(`Action Failed`);
    } else {
      res.status(400).end(`Unknown`);
    }
  }
};
