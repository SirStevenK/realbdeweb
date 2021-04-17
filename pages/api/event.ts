import CheckSchema from "@/lib/ajv/CheckSchema";
import CreateEvent, {
  SchemaBodyCreateEvent,
} from "@/lib/services/event/CreateEvent";
import GetEvents from "@/lib/services/event/GetEvents";
import RouteWithInfoUser from "@/lib/services/routes/RouteWithInfoUser";

export default RouteWithInfoUser(async (req, res, { isConnected }) => {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(await GetEvents());
      break;
    case "POST":
      if (!isConnected) throw "Not Connected";
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
});
