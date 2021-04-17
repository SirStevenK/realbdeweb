import { serialize } from "cookie";
import { NextApiResponse } from "next";

export default function RemoveTokenCookie(res: NextApiResponse): void {
  const cookie = serialize(process.env.TOKEN_NAME as string, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
}
