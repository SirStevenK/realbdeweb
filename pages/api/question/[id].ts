import CheckSchema from "@/lib/ajv/CheckSchema";
import DeleteQuestion from "@/lib/services/question/DeleteQuestion";
import GetQuestionById from "@/lib/services/question/GetQuestionById";
import UpdateQuestion, {
  SchemaBodyUpdateQuestion,
} from "@/lib/services/question/UpdateQuestion";
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
          const question = GetQuestionById(id as string);
          if (question) {
            res.status(200).json(question);
            break;
          } else throw new Error("Not Exist");
        } else throw new Error("Bad Request");
      case "PUT":
        if (isIdValid && CheckSchema(SchemaBodyUpdateQuestion, req.body)) {
          UpdateQuestion(id as string, req.body);
          res.status(200).end();
          break;
        } else throw new Error("Bad Request");
      case "DELETE":
        if (isIdValid) {
          DeleteQuestion(id as string);
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
