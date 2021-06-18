import CheckSchema from "@/lib/ajv/CheckSchema";
import storage from "@/lib/aws/Storage";
import RouteWithInfoUser from "@/lib/services/routes/RouteWithInfoUser";
import axios from "axios";
import UniqueFilename from "unique-filename";

export default RouteWithInfoUser(async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      if (CheckSchema(PostBodySchema, req.body)) {
        const url = req.body.url as string;

        return new Promise((resolve, reject) => {
          axios
            .get(url, { responseType: "arraybuffer" })
            .then(({ data, headers }) => {
              const buffer = Buffer.from(data, "base64");
              const indexOfParam = url.indexOf("?");
              const extension = url
                .substring(0, indexOfParam === -1 ? undefined : indexOfParam)
                .split(".")
                .pop();
              const key = `${UniqueFilename("BDEWeb/uploaded")}.${extension}`;
              const futureUrl =
                process.env.NEXT_PUBLIC_IMAGE_PREFIX + key.substring(6);
              storage.putObject(
                {
                  Bucket: "indiebaie",
                  Key: key,
                  ContentType: headers["content-type"],
                  ContentLength: buffer.length,
                  Body: buffer,
                },
                (err, _data) => {
                  if (err) reject();
                  else {
                    resolve(futureUrl);
                  }
                }
              );
            })
            .catch(reject);
        })
          .then((futureUrl) => {
            res.status(200).json({ futureUrl });
          })
          .catch(() => {
            res.status(400).json({ success: 0 });
          });
      } else {
        res.status(400).json({ success: 0 });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});

const PostBodySchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    url: { type: "string" },
  },
  required: ["url"],
};
