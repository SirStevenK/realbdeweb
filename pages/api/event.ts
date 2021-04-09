import CheckSchema from "@/lib/ajv/CheckSchema";
import CreateEvent, {
  SchemaBodyCreateEvent,
} from "@/lib/services/event/CreateEvent";
import GetEvents from "@/lib/services/event/GetEvents";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        res.status(200).json(await GetEvents());
        break;
      case "POST":
        if (CheckSchema(SchemaBodyCreateEvent, req.body)) {
          const done = await CreateEvent(req.body);
          if (done) res.status(201).end();
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
