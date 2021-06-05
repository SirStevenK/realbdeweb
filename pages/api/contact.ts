import CheckSchema from "@/lib/ajv/CheckSchema";
import SendMail from "@/lib/email/SendMail";
import CreateContact from "@/lib/services/contact/CreateContact";
import RouteWithInfoUser from "@/lib/services/routes/RouteWithInfoUser";

export default RouteWithInfoUser(async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      if (CheckSchema(PostSchemaBody, req.body)) {
        const done = await CreateContact({
          date: new Date().toISOString(),
          name: req.body.name,
          email: (req.body.email as string).toLowerCase(),
          message: req.body.message,
        });
        SendMail(
          `Nouveau Contact - BDE Site Web`,
          process.env.WEBSITE_EMAIL as string,
          `Nom : ${req.body.name}<br/><br/>Email : ${(
            req.body.email as string
          ).toLowerCase()}<br/><br/>Message : ${req.body.message.replace(
            /\n/g,
            "<br/>"
          )}`
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
    name: { type: "string" },
    email: { type: "string" },
    message: { type: "string" },
  },
  required: ["name", "email", "message"],
};
