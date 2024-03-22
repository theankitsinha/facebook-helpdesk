import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Facebook Page',
};
export default function Page({params}: { params: { pageId: string } }) {
    return (
        <>
            {/*<HelpDeskPage pageId={params.pageId.toString()}/>*/}
        </>
    )
}