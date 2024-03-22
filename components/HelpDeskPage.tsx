'use client';
import React, {useEffect, useState} from 'react';
import Sidebar from "@/components/Sidebar";
import ChatPortal from "@/components/ChatPortal";
import {SinglePageType} from "@/types/facebook";
import {fbGraphApi} from "@/lib/facebook";
import {useRouter} from "next/navigation";

export default function HelpDeskPage({pageId}: { pageId: string }) {
    const [pageDetails, setPageDetails] = useState<SinglePageType>();
    const router = useRouter();

    const getPageDetails = async () => {
        const response = await fetch('/api/core/page?pageId=' + pageId);
        const data = await response.json();
        setPageDetails(data);
        const clientId = '6727123460722933';
        const res = await fbGraphApi.get(`/${clientId}`, {
            params: {
                access_token: data.accessToken,
                fields: "name,first_name,last_name,profile_pic,email",
            },
        }).catch(async (error) => {
            if (error?.response?.data?.error?.type === "OAuthException") {
                const res = await fetch('/api/core/page',
                    {
                        method: 'DELETE',
                        body: JSON.stringify({
                            pageId: pageId,
                        })
                    }
                );
                await res.json();
                router.push('/')
            }

        });
    };
    useEffect(() => {
        getPageDetails();
    }, []);

    return (
        <div className="flex h-[100vh] w-[100vw]">
            {/* Sidebar navigation */}
            <div className="flex flex-col w-[5%] min-w-[60px] bg-primary">
                <Sidebar/>
            </div>

            {/* Main work section dock (Changable) */}
            <div className="flex w-[95%]">
                {pageDetails && (
                    <ChatPortal pageId={pageId} pageDetails={pageDetails}/>
                )}
            </div>
        </div>
    );
};
