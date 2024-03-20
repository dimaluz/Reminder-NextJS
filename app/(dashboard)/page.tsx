import CollectionCard from "@/components/CollectionCard";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import { CreateOrganization, currentUser } from "@clerk/nextjs";
import { Suspense } from "react";
import { PiSmileySadLight } from "react-icons/pi";



export default async function Home() {
  return(
    <>
      <Suspense fallback={<Loading />}>
        <WelcomeMsg />
      </Suspense>
      <Suspense fallback={<div>Loading collections...</div>}>
        <CollectionList />
      </Suspense>
    </>
    
  )
}

async function WelcomeMsg(){

  const user = await currentUser();

  if(!user) return <div>Error</div>

  return (
    <div className="flex w-full mb-10">
      <h1 className="text-2xl font-semibold">
        Welcome, {user.firstName} {user.lastName}!
      </h1>
    </div>
  )
}

function Loading(){
  return (
    <div className="flex w-full">
      <h1 className="text-2xl font-semibold">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h1>
    </div>
  )
}

async function CollectionList(){
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
      where: {
        userId: user?.id,
      },
  });
  if(collections.length === 0){
    return (
      <div className="flex flex-col gap-5 mt-4">
        <Alert>
          <PiSmileySadLight />
          <AlertTitle>There are not collections yet!</AlertTitle>
          <AlertDescription>Please create collection to get started.</AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    )
  }
  return (
    <>
      <CreateCollectionBtn />
      <div className='flex flex-col gap-4 mt-10'>
        {collections.map(collection => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  )
}