// import { withIronSessionApiRoute } from 'iron-session/next';
import { plaidClient } from "../../lib/plaid";
import { getUserFromCookieServer, hashUserAccessCodes } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function exchangePublicToken(req, res) {
  //Get User from header.cookie
  const user = await getUserFromCookieServer(req, res);
  const exchangeResponse = await plaidClient.itemPublicTokenExchange({
    public_token: req.body.public_token,
  });

  try {
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token: req.body.public_token,
    });

    const access_token = exchangeResponse.data.access_token;
    const item_id = exchangeResponse.data.item_id;

    const updateUser = await db.user.update({
      where: {
        email: user.email,
      },
      data: {
        accessCode: access_token,
        itemId: item_id,
      },
    });
    res.status(201).send({ ok: true, message: "exchange successful" });
  } catch (error) {
    //TODO: Better error handling
    console.error(error);
  }
}
