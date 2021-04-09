import CheckSchema from "@/lib/ajv/CheckSchema";
import DeleteEvent from "@/lib/services/event/DeleteEvent";
import GetEventByID from "@/lib/services/event/GetEventById";
import UpdateEvent, {
  SchemaBodyUpdateEvent,
} from "@/lib/services/event/UpdateEvent";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
    method,
  } = req;

  const isIdValid = typeof id === "string" && id.length > 0;

  try {
    switch (method) {
      case "GET":
        if (isIdValid) {
          const event = await GetEventByID(id as string);
          if (event) {
            res.status(200).json(event);
            break;
          } else throw new Error("Not Exist");
        } else throw new Error("Bad Request");
      case "PUT":
        if (isIdValid && CheckSchema(SchemaBodyUpdateEvent, req.body)) {
          const done = await UpdateEvent(id as string, req.body);
          if (done) res.status(200).end();
          else throw "Failed";
          break;
        } else throw new Error("Bad Request");
      case "DELETE":
        if (isIdValid) {
          const done = await DeleteEvent(id as string);
          if (done) res.status(200).end();
          else throw "Failed";
          break;
        } else throw new Error("Bad Request");
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    if (e === "Bad Request") {
      res.status(400).end(`Bad Request`);
    } else if (e === "Not Exist") {
      res.status(400).end(`Not Exist`);
    } else if (e === "Failed") {
      res.status(400).end(`Action Failed`);
    } else {
      res.status(400).end(`Unknown`);
    }
  }
};
