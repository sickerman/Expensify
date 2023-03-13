import { getUserFromCookieServer } from "@/lib/auth";
import { db } from "@/lib/db";
import { plaidClient } from "../../lib/plaid";

export default async function transactions(req, res) {
  const user = await getUserFromCookieServer(req, res);

  const { accessCode } = await db.user.findUnique({
    where: {
      email: user.email,
    },
    select: {
      email: true,
      accessCode: true,
    },
  });
  // Set cursor to empty to receive all historical updates
  let cursor = null;

  // New transaction updates since "cursor"
  let added = [];
  let modified = [];
  // Removed transaction ids
  let removed = [];
  let hasMore = true;
  // Iterate through each page of new transaction updates for item
  while (hasMore) {
    const request = {
      access_token: accessCode,
      cursor: cursor,
    };
    const response = await plaidClient.transactionsSync(request);
    const data = response.data;
    // Add this page of results
    added = added.concat(data.added);
    modified = modified.concat(data.modified);
    removed = removed.concat(data.removed);
    hasMore = data.has_more;
    // Update cursor to the next cursor
    cursor = data.next_cursor;
  }

  const compareTxnsByDateAscending = (a, b) =>
    (a.date > b.date) - (a.date < b.date);
  // Return the 8 most recent transactions
  const results = [...added].sort(compareTxnsByDateAscending).slice(-8);

  res.json({ latest_transactions: results });
}
