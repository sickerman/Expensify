import { PlaidLink } from "@/components/PlaidLink";
import { getUserFromCookie } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function page(){
  const user = {}
  
  return (
    <div className='ml-16 p-6 w-full'>
      <h1>Dashboard</h1>
      <PlaidLink/>
    </div>
  )
}