'use client';

import { Collection } from "@prisma/client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constans";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { AiOutlinePlus } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { deleteCollection } from "@/actions/collection";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";



interface Props{
    collection: Collection 

}

const tasks:string[] = [];

export default function CollectionCard({collection}:Props){

    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const [isLoading, startTransition] = useTransition()

    const removeCollection = async () => {
        try{
            await deleteCollection(collection.id);
            toast({
                title: "Success",
                description: "Collection successfully deleted!",
            })
            router.refresh();
        }catch(error){
            toast({
                title: "Error",
                description: "Cannot delete collection!",
                variant: "destructive",
            })
        }
    }

    return (
        <div>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                    <Button
                        variant={"ghost"}
                        className={cn(
                            'flex w-full justify-between p-6',
                            isOpen && 'rounded-b-none',
                            CollectionColors[collection.color as CollectionColor]
                        )}
                    >
                        <span className="text-white font-bold ">
                            {collection.name}
                        </span>
                        {!isOpen && <CaretDownIcon className="h-6 w-6" />}
                        {isOpen && <CaretUpIcon className="h-6 w-6" />}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
                    {tasks.length === 0 && <div>No tasks</div>}
                    {
                        tasks.length > 0 && (
                            <>
                                <Progress className="rounded-none" value={45} />
                                <div className='p-4 gap-3 flex flex-col'>
                                    {tasks.map(task => (
                                        <div>Mocked task</div>
                                    ))}
                                </div>
                            </>
                        )
                    }
                    <Separator />
                    <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex justify-between items-center">
                        <p>Created at {collection.createdAt.toDateString()}</p>
                        {isLoading && <div>Deleting...</div>}
                        {!isLoading && (
                            <div>
                                <Button size={"icon"} variant={'ghost'}>
                                    <AiOutlinePlus className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button size={"icon"} variant={'ghost'}>
                                            <VscTrash className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogTitle>
                                            Do you really want to delete?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will delete your collection and all tasks there.
                                        </AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction 
                                                onClick={() => {startTransition(removeCollection)}}
                                            >
                                                Proceed
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}
                        
                    </footer>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}