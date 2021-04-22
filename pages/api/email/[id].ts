import CheckSchema from "@/lib/ajv/CheckSchema";
import DeleteEmail from "@/lib/services/email/DeleteEmail";
import GetEmailByID from "@/lib/services/email/GetEmailById";
import UpdateEmail, {
  SchemaBodyUpdateEmail,
} from "@/lib/services/email/UpdateEmail";
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
        const email = await GetEmailByID(id as string);
        if (email) {
          res.status(200).json(email);
          break;
        } else throw new Error("Not Exist");
      } else throw new Error("Bad Request");
    case "POST":
      // Send email
      res.status(200).end();
      break;
    case "PUT":
      if (!isConnected) throw "Not Connected";
      if (isIdValid && CheckSchema(SchemaBodyUpdateEmail, req.body)) {
        const done = await UpdateEmail(id as string, req.body);
        if (done) res.status(200).end();
        else throw "Failed";
        break;
      } else throw new Error("Bad Request");
    case "DELETE":
      if (!isConnected) throw "Not Connected";
      if (isIdValid) {
        const done = await DeleteEmail(id as string);
        if (done) res.status(200).end();
        else throw "Failed";
        break;
      } else throw new Error("Bad Request");
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
