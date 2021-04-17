import GetLoginSession from "@/lib/auth/GetLoginSession";
import RemoveTokenCookie from "@/lib/cookie/RemoveTokenCookie";
import { magic } from "@/lib/magic/magic";
import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const session = await GetLoginSession(req);

    if (session) {
      await magic.users.logoutByIssuer(session.issuer as string);
      RemoveTokenCookie(res);
    }
  } catch (error) {
    console.error(error);
  }

  res.writeHead(302, { Location: "/" });
  res.end();
};
