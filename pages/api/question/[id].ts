import CheckSchema from "@/lib/ajv/CheckSchema";
import DeleteQuestion from "@/lib/services/question/DeleteQuestion";
import GetQuestionById from "@/lib/services/question/GetQuestionById";
import UpdateQuestion, {
  SchemaBodyUpdateQuestion,
} from "@/lib/services/question/UpdateQuestion";
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
        const question = await GetQuestionById(id as string);
        if (question) {
          res.status(200).json(question);
          break;
        } else throw new Error("Not Exist");
      } else throw new Error("Bad Request");
    case "PUT":
      if (!isConnected) throw "Not Connected";
      if (isIdValid && CheckSchema(SchemaBodyUpdateQuestion, req.body)) {
        const done = await UpdateQuestion(id as string, req.body);
        if (done) res.status(200).end();
        else throw "Failed";
        break;
      } else throw new Error("Bad Request");
    case "DELETE":
      if (!isConnected) throw "Not Connected";
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
});
