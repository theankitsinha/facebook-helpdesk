import React from "react";
import UserImageDefault from "@/public/assets/user.png";
import {PhoneCall, User} from "lucide-react";
import Image from "next/image";
import NewButton from "@/components/ui/buttonNew";
import Card from "@/components/ui/card";

const CustomerInformation = ({chat}: { chat: any }) => {
    return (
        <div className="flex flex-col w-full h-full border-l">
            <div className="flex flex-col gap-2 w-full items-center p-10 border-b">
                <Image
                    src={UserImageDefault}
                    alt="User"
                    className="w-20 h-20 rounded-full items-center"
                />
                <h1 className="text-xl font-medium mt-3">{chat?.client?.name}</h1>
                <div className="flex items-center gap-2 opacity-60">
                    <div className="h-2 w-2 bg-black rounded-full"></div>
                    <span>Offline</span>
                </div>
                <div className="flex mt-2 gap-4">
                    <NewButton className="bg-white font-medium border shadow">
                        <div className="flex items-center gap-1">
                            <PhoneCall className="h-4 w-4" color="black"/>{" "}
                            <span className="text-black">Call</span>
                        </div>
                    </NewButton>
                    <NewButton className="bg-white font-medium border shadow">
                        <div className="flex items-center gap-1">
                            <User className="h-4 w-4" color="black"/>{" "}
                            <span className="text-black">Profile</span>
                        </div>
                    </NewButton>
                </div>
            </div>

            <div className="flex justify-center bg-[#EFF2F7] h-full py-10 px-3">
                <Card className="px-3 py-3 w-full">
                    <div className="flex flex-col items-start w-[95%] overflow-hidden">
                        <h1 className="text-lg font-medium mb-3">Customer details</h1>
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between gap-2">
                                <span className="opacity-60">Email</span>
                                <span className="font-medium">example@gmail.com</span>
                            </div>
                            <div className="flex w-full justify-between gap-2">
                                <span className="opacity-60">First Name</span>
                                <span className="font-medium">{chat?.client?.first_name}</span>
                            </div>
                            <div className="flex w-full justify-between gap-2">
                                <span className="opacity-60">Last Name</span>
                                <span className="font-medium">{chat?.client?.last_name}</span>
                            </div>
                        </div>
                        <a
                            target="_blank"
                            href={`https://facebook.com/${chat?.client?.id}`}
                            className="mt-4 text-[#2E6797] text-lg font-medium"
                        >
                            View more details
                        </a>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default CustomerInformation;