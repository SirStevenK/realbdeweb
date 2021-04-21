import CheckSchema from "@/lib/ajv/CheckSchema";
import CreateAdministrator from "@/lib/services/administrator/CreateAdministrator";
import GetAdministrators from "@/lib/services/administrator/GetAdministrators";
import RouteWithInfoUser from "@/lib/services/routes/RouteWithInfoUser";

export default RouteWithInfoUser(async (req, res, { isConnected }) => {
  const { method } = req;

  switch (method) {
    case "GET":
      if (!isConnected) throw "Not Connected";
      res.status(200).json(await GetAdministrators());
      break;
    case "POST":
      if (!isConnected) throw "Not Connected";
      if (CheckSchema(PostSchemaBody, req.body)) {
        const done = await CreateAdministrator({
          email: (req.body.email as string).toLowerCase(),
        });
        if (done) res.status(200).end();
        else throw "Failed";
        break;
      } else throw new Error("Bad Request");
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});

export const PostSchemaBody = {
  type: "object",
  additionalProperties: false,
  properties: {
    email: { type: "string" },
  },
  required: ["email"],
};
