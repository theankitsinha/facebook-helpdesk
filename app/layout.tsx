import type {Metadata} from "next";
import {Noto_Sans} from "next/font/google";
import "./globals.css";
import DefaultLayout from "@/components/DefaultLayout";
import React from "react";
import AuthProvider from "@/components/AuthProvider";

const inter = Noto_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "RichPanel Facebook Helpdesk",
    description: "RichPanel Facebook Helpdesk -  www.theankitsinha.in",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" type="image/png" href="/assets/rich-panel.png"/>
            <link rel="apple-touch-icon" type="image/png" href="/assets/rich-panel.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/assets/rich-panel.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/assets/rich-panel.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/assets/rich-panel.png"/>
        </head>
        <body className={inter.className}>
        <AuthProvider>
            <DefaultLayout>{children}</DefaultLayout>
        </AuthProvider>
        </body>
        </html>
    );
}
