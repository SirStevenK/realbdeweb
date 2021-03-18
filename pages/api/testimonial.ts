import CheckSchema from "@/lib/ajv/CheckSchema";
import CreateTestimonial, {
  SchemaBodyCreateTestimonial,
} from "@/lib/services/testimonial/CreateTestimonial";
import GetTestimonials from "@/lib/services/testimonial/GetTestimonials";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        res.status(200).json(GetTestimonials());
        break;
      case "POST":
        if (CheckSchema(SchemaBodyCreateTestimonial, req.body)) {
          CreateTestimonial(req.body);
          res.status(201).end();
          break;
        } else throw new Error("Bad Request");
      default:
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    if (e === "Bad Request") {
      res.status(400).end(`Bad Request`);
    } else {
      res.status(400).end(`Unknown`);
    }
  }
};
