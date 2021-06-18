import GetLoginSession from "@/lib/auth/GetLoginSession";
import { NextApiHandler } from "next";

const route: NextApiHandler = async (req, res) => {
  const session = await GetLoginSession(req);
  // After getting the session you may want to fetch for the user instead
  // of sending the session's payload directly, this example doesn't have a DB
  // so it won't matter in this case
  res.status(200).json({ user: session || null });
};

export default route;
