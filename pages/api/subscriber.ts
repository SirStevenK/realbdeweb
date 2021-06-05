import CheckSchema from "@/lib/ajv/CheckSchema";
import SendMail from "@/lib/email/SendMail";
import RouteWithInfoUser from "@/lib/services/routes/RouteWithInfoUser";
import CreateSubscriber from "@/lib/services/subscriber/CreateSubscriber";

export default RouteWithInfoUser(async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      if (CheckSchema(PostSchemaBody, req.body)) {
        const done = await CreateSubscriber({
          date: new Date().toISOString(),
          email: (req.body.email as string).toLowerCase(),
        });
        SendMail(
          `Nouvel abonné newsletter - BDE Site Web`,
          process.env.WEBSITE_EMAIL as string,
          `Email de l'utilisateur: ${(req.body.email as string).toLowerCase()}`
        );
        if (done) res.status(200).end();
        else throw "Failed";
        break;
      } else throw new Error("Bad Request");
    default:
      res.setHeader("Allow", ["POST"]);
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
