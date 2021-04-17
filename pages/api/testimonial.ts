import CheckSchema from "@/lib/ajv/CheckSchema";
import RouteWithInfoUser from "@/lib/services/routes/RouteWithInfoUser";
import CreateTestimonial, {
  SchemaBodyCreateTestimonial,
} from "@/lib/services/testimonial/CreateTestimonial";
import GetTestimonials from "@/lib/services/testimonial/GetTestimonials";

export default RouteWithInfoUser(async (req, res, { isConnected }) => {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(await GetTestimonials());
      break;
    case "POST":
      if (!isConnected) throw "Not Connected";
      if (CheckSchema(SchemaBodyCreateTestimonial, req.body)) {
        const done = await CreateTestimonial(req.body);
        if (done) res.status(201).end();
        else throw "Failed";
        break;
      } else throw new Error("Bad Request");
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
