import { parse } from "cookie";
import { NextApiRequest } from "next";

export default function ParseCookies(
  req: NextApiRequest
): Record<string, string> {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies;

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie;
  return parse(cookie || "");
}
