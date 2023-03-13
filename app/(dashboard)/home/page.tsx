import React, {Suspense} from 'react'
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";

export default function page() {
  return (
    <div className='ml-16 p-6 w-full'>
      <h1>Dashboard</h1>
      <Suspense fallback={<GreetingsSkeleton />}>
        <Greetings />
      </Suspense>
    </div>
  )
}