import { UserSessionProps } from "@/types/user";
import Iron from "@hapi/iron";
import { NextApiRequest } from "next";
import GetTokenCookie from "../cookie/GetTokenCookie";

export default async function GetLoginSession(
  req: NextApiRequest
): Promise<UserSessionProps | null> {
  const token = GetTokenCookie(req);

  if (!token) return null;

  const session = await Iron.unseal(
    token,
    process.env.TOKEN_SECRET as string,
    Iron.defaults
  );
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error("Session expired");
  }

  return session;
}
