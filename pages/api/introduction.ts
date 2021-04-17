import CheckSchema from "@/lib/ajv/CheckSchema";
import GetIntroduction from "@/lib/services/introduction/GetIntroduction";
import UpdateIntroduction, {
  SchemaBodyUpdateIntroduction,
} from "@/lib/services/introduction/UpdateIntroduction";
import RouteWithInfoUser from "@/lib/services/routes/RouteWithInfoUser";

export default RouteWithInfoUser(async (req, res, { isConnected }) => {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).end(await GetIntroduction());
      break;
    case "PUT":
      if (!isConnected) throw "Not Connected";
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
});
