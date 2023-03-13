import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST" || req.method === "GET" ) {
    res.setHeader(
      "Set-Cookie",
      serialize(process.env.COOKIE_NAME, 'deleted', {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      })
    );
    res.status(200);
    res.json({succes: "OK"});
  } else {
    res.status(402);
    res.json({});
  }
}
