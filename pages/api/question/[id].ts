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
          const question = await GetQuestionById(id as string);
          if (question) {
            res.status(200).json(question);
            break;
          } else throw new Error("Not Exist");
        } else throw new Error("Bad Request");
      case "PUT":
        if (isIdValid && CheckSchema(SchemaBodyUpdateQuestion, req.body)) {
          const done = await UpdateQuestion(id as string, req.body);
          if (done) res.status(200).end();
          else throw "Failed";
          break;
        } else throw new Error("Bad Request");
      case "DELETE":
        if (isIdValid) {
          const done = await DeleteQuestion(id as string);
          if (done) res.status(200).end();
          else throw "Failed";
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
    } else if (e === "Failed") {
      res.status(400).end(`Action Failed`);
    } else {
      res.status(400).end(`Unknown`);
    }
  }
};
