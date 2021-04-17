import CheckSchema from "@/lib/ajv/CheckSchema";
import CreateQuestion, {
  SchemaBodyCreateQuestion,
} from "@/lib/services/question/CreateQuestion";
import GetQuestions from "@/lib/services/question/GetQuestions";
import RouteWithInfoUser from "@/lib/services/routes/RouteWithInfoUser";

export default RouteWithInfoUser(async (req, res, { isConnected }) => {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(await GetQuestions());
      break;
    case "POST":
      if (!isConnected) throw "Not Connected";
      if (CheckSchema(SchemaBodyCreateQuestion, req.body)) {
        const done = await CreateQuestion(req.body);
        if (done) res.status(201).end();
        else throw "Failed";
        break;
      } else throw new Error("Bad Request");
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
