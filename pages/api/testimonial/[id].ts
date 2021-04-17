import CheckSchema from "@/lib/ajv/CheckSchema";
import RouteWithInfoUser from "@/lib/services/routes/RouteWithInfoUser";
import DeleteTestimonial from "@/lib/services/testimonial/DeleteTestimonial";
import GetTestimonialById from "@/lib/services/testimonial/GetTestimonialById";
import UpdateTestimonial, {
  SchemaBodyUpdateTestimonial,
} from "@/lib/services/testimonial/UpdateTestimonial";

export default RouteWithInfoUser(async (req, res, { isConnected }) => {
  const {
    query: { id },
    method,
  } = req;

  const isIdValid = typeof id === "string" && id.length > 0;

  switch (method) {
    case "GET":
      if (isIdValid) {
        const testimonial = await GetTestimonialById(id as string);
        if (testimonial) {
          res.status(200).json(testimonial);
          break;
        } else throw new Error("Not Exist");
      } else throw new Error("Bad Request");
    case "PUT":
      if (!isConnected) throw "Not Connected";
      if (isIdValid && CheckSchema(SchemaBodyUpdateTestimonial, req.body)) {
        const done = await UpdateTestimonial(id as string, req.body);
        if (done) res.status(200).end();
        else throw "Failed";
        break;
      } else throw new Error("Bad Request");
    case "DELETE":
      if (!isConnected) throw "Not Connected";
      if (isIdValid) {
        const done = await DeleteTestimonial(id as string);
        if (done) res.status(200).end();
        else throw "Failed";
        break;
      } else throw new Error("Bad Request");
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
