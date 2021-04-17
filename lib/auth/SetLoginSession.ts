import Iron from "@hapi/iron";
import { MagicUserMetadata } from "@magic-sdk/admin";
import { NextApiResponse } from "next";
import SetTokenCookie from "../cookie/SetTokenCookie";

const MAX_AGE = Number(process.env.MAX_AGE);

export default async function SetLoginSession(
  res: NextApiResponse,
  session: MagicUserMetadata
): Promise<void> {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(
    obj,
    process.env.TOKEN_SECRET as string,
    Iron.defaults
  );

  SetTokenCookie(res, token);
}
