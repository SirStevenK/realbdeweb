import { NextApiRequest, NextApiResponse } from "next";
import GetLoginSession from "@/lib/auth/GetLoginSession";
import { UserSessionProps } from "@/types/user";

type InfoUserType = {
  session: UserSessionProps | null;
  isConnected: boolean;
};

type ApiRouteType = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void;

type CallbackRouteType = (
  req: NextApiRequest,
  res: NextApiResponse,
  infoUser: InfoUserType
) => Promise<void> | void;

export default function RouteWithInfoUser(
  callback: CallbackRouteType
): ApiRouteType {
  return async (req, res) => {
    try {
      const session = await GetLoginSession(req);

      const infoUser: InfoUserType = {
        isConnected: Boolean(session),
        session,
      };
      return await callback(req, res, infoUser);
    } catch (e) {
      if (e.message === "Bad Request") {
        res.status(400).end(`Bad Request`);
      } else if (e.message === "Failed") {
        res.status(400).end(`Action Failed`);
      } else if (e.message === "Session expired") {
        res.status(401).end(`Session expired`);
      } else if (e.message === "Not Connected") {
        res.status(401).end(`Not Connected`);
      } else {
        res.status(400).end(e.message || `Unknown Error`);
      }
    }
  };
}
