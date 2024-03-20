'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import SideBar from "./SideBar";


export default function CreateCollectionBtn(){

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    }

    return (
        <div className="w-full rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[1px]">
            <Button 
                variant={"outline"}
                onClick={() => setIsOpen(true)} 
                className="dark:text-white w-full dark:bg-neutral-950 bg-white"
            >
                <span className="bg-gradient-to-r from-red-500 to-orange-400 hover:to-orange-800 bg-clip-text text-transparent">
                    Create collection
                </span>
            </Button>
            <SideBar open={isOpen} onOpenChange={handleOpenChange} />
        </div>
        
    )
}