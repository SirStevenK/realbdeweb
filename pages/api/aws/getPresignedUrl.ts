import storage from "@/lib/aws/Storage";
import RouteWithInfoUser from "@/lib/services/routes/RouteWithInfoUser";
import UniqueFilename from "unique-filename";

export default RouteWithInfoUser(async (req, res, { isConnected }) => {
  const { method } = req;

  const filename = req.query.filename as string;
  const type = req.query.type as string;

  const isValidQuery = typeof filename === "string" && typeof type === "string";

  switch (method) {
    case "GET":
      if (isConnected && isValidQuery) {
        const extension = filename.split(".").pop();
        const key = `${UniqueFilename("BDEWeb/uploaded")}.${extension}`;
        const futureUrl =
          process.env.NEXT_PUBLIC_IMAGE_PREFIX + key.substring(6);
        const presignedUrl = await storage.getSignedUrlPromise("putObject", {
          Bucket: "indiebaie",
          Key: key,
          Expires: 60,
        });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send({ presignedUrl, futureUrl });
      } else throw new Error("Not Connected");
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});
