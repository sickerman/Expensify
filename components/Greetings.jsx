import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";
import { delay } from "@/lib/async";

const getData = async () => {
  await delay(5000);
  const user = await getUserFromCookie(cookies());
  return user;
};

const Greetings = async () => {
  const user = await getData();

  return (
    <Card className="w-full py-4 relative">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Welcome, {user.firstName} 👋
        </h1>
      </div>
    </Card>
  );
};

export default Greetings;