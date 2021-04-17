import { NextApiRequest } from "next";
import ParseCookies from "./ParseCookies";

export default function GetTokenCookie(req: NextApiRequest): string {
  const cookies = ParseCookies(req);
  return cookies[process.env.TOKEN_NAME as string];
}
