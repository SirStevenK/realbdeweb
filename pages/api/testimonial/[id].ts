import CheckSchema from "@/lib/ajv/CheckSchema";
import DeleteTestimonial from "@/lib/services/testimonial/DeleteTestimonial";
import GetTestimonialById from "@/lib/services/testimonial/GetTestimonialById";
import UpdateTestimonial, {
  SchemaBodyUpdateTestimonial,
} from "@/lib/services/testimonial/UpdateTestimonial";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
    method,
  } = req;

  const isIdValid = typeof id === "string" && id.length > 0;

  try {
    switch (method) {
      case "GET":
        if (isIdValid) {
          const testimonial = GetTestimonialById(id as string);
          if (testimonial) {
            res.status(200).json(testimonial);
            break;
          } else throw new Error("Not Exist");
        } else throw new Error("Bad Request");
      case "PUT":
        if (isIdValid && CheckSchema(SchemaBodyUpdateTestimonial, req.body)) {
          UpdateTestimonial(id as string, req.body);
          res.status(200).end();
          break;
        } else throw new Error("Bad Request");
      case "DELETE":
        if (isIdValid) {
          DeleteTestimonial(id as string);
          res.status(200).end();
          break;
        } else throw new Error("Bad Request");
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    if (e === "Bad Request") {
      res.status(400).end(`Bad Request`);
    } else if (e === "Not Exist") {
      res.status(400).end(`Not Exist`);
    } else {
      res.status(400).end(`Unknown`);
    }
  }
};
