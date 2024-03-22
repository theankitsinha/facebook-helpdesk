import React from "react";
import Icon from "@/public/assets/rich-panel.png";
import Inbox from "@/public/assets/inbox.png";
import InboxSelected from "@/public/assets/inbox_selected.png";
import LineChart from "@/public/assets/line_chart.png";
import LineChartSelected from "@/public/assets/line_chart_selected.png";
import Friends from "@/public/assets/friends.png";
import FriendsSelected from "@/public/assets/friends_selected.png";
import DefaultUserImage from "@/public/assets/user.png";
import {LogOut} from "lucide-react";
import Image from "next/image";
import {signOut} from "next-auth/react";
import {cn} from "@/lib/utils";

const Sidebar = () => {
    const sidebarOps = [
        {
            active: true,
            icon: Inbox,
            iconSelected: InboxSelected,
        },
        {
            active: false,
            icon: Friends,
            iconSelected: FriendsSelected,
        },
        {
            active: false,
            icon: LineChart,
            iconSelected: LineChartSelected,
        },
    ];

    return (
        <div className="flex flex-col items-center gap-12 p-4 h-full">
            {/* icon */}
            <div className="flex  items-center justify-center w-full">
                <Image src={Icon} className="h-12 w-12 rounded" alt={'richpanel-icon'}/>
            </div>

            <div className="flex flex-col gap-10">
                {sidebarOps?.map((singleSidebarOption, index) => (
                    <span key={index} className={cn("p-4", singleSidebarOption.active ? 'bg-white rounded-xl' : '')}>
                        <Image alt={"option" + index} width={20} height={20}
                               src={singleSidebarOption.active ? singleSidebarOption.iconSelected : singleSidebarOption.icon}
                               className="h-6 w-6"/>
                    </span>
                ))}
            </div>

            <div className="flex flex-col gap-5 items-center mt-auto">
                <LogOut
                    color="white"
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => signOut()}
                />
                <div className="relative">
                    <Image src={DefaultUserImage} alt="user" className="w-8"/>
                    <div className="h-3 w-3 bg-lime-500 rounded-full absolute right-0 -bottom-[2px]"></div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;