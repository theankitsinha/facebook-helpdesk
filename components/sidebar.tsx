'use client'

import { cn } from "@/lib/utils";
import { Inbox, LineChart, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react"
import UserAvatar from "./user-avatar";

interface SideBarProps { }

const sideIcons = [
    {
        name: 'Messages',
        icon: Inbox,
        href: '/dashboard/conversation'
    },
    {
        name: 'Users',
        icon: UsersRound,
        href: '/dashboard/users'
    },
    {
        name: 'Analytics',
        icon: LineChart,
        href: '/dashboard/analytics'
    }
]

const SideBar: FC<SideBarProps> = ({ }) => {

    const pathname = usePathname()

    return <div className="min-h-full bg-[#004e96] flex flex-col items-center py-2">
        <div className="relative">
            <Image
                src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fglobal-uploads.webflow.com%2F5efccc15b40a7dfbb529ea1a%2F5fa1b350a973f63a3cdb0a84_Richpanel_Logo_Mark_Color-p-800.png&f=1&nofb=1&ipt=f9e6d16970419843b1a50b1fc4342ad83346c15337b6442e74fa790601f3b883&ipo=images"}
                alt="logo"
                height={55}
                width={55}
                className="rounded-full hover:cursor-pointer"
            />
        </div>

        <div className="mt-2 w-full space-y-5">
            {
                sideIcons.map((value, index) => (
                    <Link href={value.href} key={index}>
                        <div className={cn("mt-2 py-4 flex items-center justify-center", pathname.includes(value.href) && "bg-white text-black transition duration-300 ease-linear transform")}>
                            <value.icon className={cn("h-7 w-7 text-white", pathname.includes(value.href) && "text-black")} aria-label={value.name} />
                        </div>
                    </Link>
                ))
            }
        </div>

        <div className="pb-3 mt-auto">
            <div className="relative rounded-full">
                <UserAvatar firstName="Amit" lastName="RG" className="h-10 w-10"/>
            </div>
        </div>
    </div>
}

export default SideBar;