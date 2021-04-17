import CheckSchema from "@/lib/ajv/CheckSchema";
import DeleteEvent from "@/lib/services/event/DeleteEvent";
import GetEventByID from "@/lib/services/event/GetEventById";
import UpdateEvent, {
  SchemaBodyUpdateEvent,
} from "@/lib/services/event/UpdateEvent";
import RouteWithInfoUser from "@/lib/services/routes/RouteWithInfoUser";

export default RouteWithInfoUser(async (req, res, { isConnected }) => {
  const {
    query: { id },
    method,
  } = req;

  const isIdValid = typeof id === "string" && id.length > 0;

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
      if (!isConnected) throw "Not Connected";
      if (isIdValid && CheckSchema(SchemaBodyUpdateEvent, req.body)) {
        const done = await UpdateEvent(id as string, req.body);
        if (done) res.status(200).end();
        else throw "Failed";
        break;
      } else throw new Error("Bad Request");
    case "DELETE":
      if (!isConnected) throw "Not Connected";
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
});
