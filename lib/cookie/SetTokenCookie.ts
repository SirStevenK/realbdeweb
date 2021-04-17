import { serialize } from "cookie";
import { NextApiResponse } from "next";

const MAX_AGE = Number(process.env.MAX_AGE);

export default function SetTokenCookie(
  res: NextApiResponse,
  token: string
): void {
  const cookie = serialize(process.env.TOKEN_NAME as string, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  res.setHeader("Set-Cookie", cookie);
}
