"use client"

import Link from "next/link";
import { FC } from "react"
import { cn } from "@/lib/utils";
import { AlignLeft, RotateCw } from "lucide-react";
import { usePathname } from "next/navigation";

interface ConversationSidebarProps { }

const messages = [
    {
        id: 1,
        href: "/dashboard/conversation",
        username: "Amit RG",
        messageFrom: "Facebook DM",
        messageTime: "10m",
        feedback: "Awesome Product",
        feedbackDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur voluptate qui inventore, repudiandae provident pariatur veniam natus autem ab nobis!"
    },
    {
        id: 2,
        href: "/dashboard/conversation",
        username: "Hitesh Saxena",
        messageFrom: "Facebook Post",
        messageTime: "10m",
        feedback: "Available in Store?",
        feedbackDesc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur voluptate qui inventore, repudiandae provident pariatur veniam natus autem ab nobis!"
    },
]

const ConversationSidebar: FC<ConversationSidebarProps> = ({ }) => {

    const pathname = usePathname()

    return <div className="h-screen w-[21rem] text-black bg-white border-2 border-[#edeef0]">
        <div className="flex flex-col h-full">
            <div className="p-4 flex items-center justify-between border-b-2 border-[#edeef0]">
                <div className="flex items-center gap-2">
                    <AlignLeft className="h-5 w-5 text-gray-500 hover:cursor-pointer" />
                    <h3 className="text-2xl leading-9 text-gray-900 font-bold">Conversations</h3>
                </div>
                <RotateCw className="h-5 w-5 text-gray-700 hover:cursor-pointer" />
            </div>

            <div className="overflow-y-auto scrollbar-hide">
                {
                    messages.map((value) => {

                        const linkToMessage = `${value.href}/${value.id}`;

                        return <Link key={value.id} href={linkToMessage}>
                            <div className={cn("p-4 space-y-4 hover:cursor-pointer border-b-2 border-[#edeef0]", pathname.includes(linkToMessage) && "bg-[#edeef0] transition duration-300 ease-in-out transform")}>
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-x-2">
                                        <input className="mr-2 leading-tight h-4 w-4 rounded-md" type="checkbox" />
                                        <div>
                                            <p className="font-semibold text-base">{value.username}</p>
                                            <p className="text-muted-foreground text-sm font-medium">{value.messageFrom}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground">{value.messageTime}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">{value.feedback}</p>
                                    <p className=" text-gray-700/90 text-sm">{value.feedbackDesc.substring(0, 40)}...</p>
                                </div>
                            </div>
                        </Link>
                    })
                }
            </div>
        </div>
    </div>
}

export default ConversationSidebar;