import CheckSchema from "@/lib/ajv/CheckSchema";
import CreateEmail, {
  SchemaBodyCreateEmail,
} from "@/lib/services/email/CreateEmail";
import GetEmails from "@/lib/services/email/GetEmails";
import RouteWithInfoUser from "@/lib/services/routes/RouteWithInfoUser";

export default RouteWithInfoUser(async (req, res, { isConnected }) => {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(await GetEmails());
      break;
    case "POST":
      if (!isConnected) throw "Not Connected";
      if (CheckSchema(SchemaBodyCreateEmail, req.body)) {
        const email_id = await CreateEmail(req.body);
        if (email_id) res.status(201).end(email_id);
        else throw "Failed";
        break;
      } else throw new Error("Bad Request");
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
