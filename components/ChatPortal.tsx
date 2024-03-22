import React, {useEffect, useRef, useState} from "react";
import {Menu, RotateCw} from "lucide-react";

import {showError,} from "@/lib/utils";
import ChatCustomers from "@/components/ChatCustomers";
import ChatDock from "@/components/ChatDock";
import CustomerInformation from "@/components/CustomerInformation";
import {Chat, MessageResponse, SinglePageType} from "@/types/facebook";
import {fbGraphApi} from "@/lib/facebook";

const ChatPortal = ({pageId, pageDetails}: { pageId: string, pageDetails: SinglePageType }) => {
    const [chats, setChats] = useState<Chat[]>();
    const [selectedChat, setSelectedChat] = useState<Chat>();
    const [loader, setLoader] = useState(false);
    const socketRef = useRef();

    const getClientDetails = async (chat: MessageResponse) => {
        try {
            const clientId = chat.senderId;
            const res = await fbGraphApi.get(`/${clientId}`, {
                params: {
                    access_token: pageDetails?.accessToken,
                    fields: "name,first_name,last_name,profile_pic,email",
                },
            });
            chat.client = res.data;
            return chat;
        } catch (error) {
            // @ts-ignore
            const errorCode = error?.response?.data?.error?.code;
            if (errorCode === 190) {
                showError("Access token expired ... please reconnect to facebook page");
                return;
            }
            // @ts-ignore
            showError(error?.message);
        }
    };

    const updateChat = async (clientId: string, senderId: string, message: string) => {
        let chatExists = false;
        const updatedChats = chats?.map((singleChat) => {
            if (singleChat?.senderId === clientId) {
                chatExists = true;
                const updatedChat = {
                    ...singleChat,
                    messages: [
                        ...singleChat.messages,
                        {
                            senderId: senderId,
                            message: message,
                            time: Date.now(),
                        },
                    ],
                };
                if (updatedChat?.senderId === selectedChat?.senderId) {
                    // @ts-ignore
                    setSelectedChat(updatedChat);
                }
                return updatedChat;
            }
            return singleChat;
        });
        // If chat does not exist create one
        if (chatExists) {
            // @ts-ignore
            setChats(updatedChats);
        } else {
            const newChat = {
                clientId: clientId,
                senderId: clientId,
                pageId: pageDetails.pageId,
                messages: [
                    {
                        senderId: senderId,
                        message: message,
                        time: new Date(),
                    },
                ],
            };
            const newChatWithDetails = await getClientDetails(newChat);
            //@ts-ignore
            setChats((prev) => [...prev, newChatWithDetails]);
        }
    };

    const getAllMessages = async () => {
        setLoader(true);
        try {
            const res = await fetch('/api/core/message?pageId=' + pageDetails.id);
            const fetchRes: MessageResponse[] = await res.json();
            const allChatsNamedPromises = fetchRes.map((chat) => {
                return getClientDetails(chat);
            });
            const allChatsWithClientDetails = await Promise.all(allChatsNamedPromises);
            if (allChatsWithClientDetails) {
                //@ts-ignore
                setChats(allChatsWithClientDetails);
            }
        } catch (error) {
            setLoader(false);
            //@ts-ignore
            showError(error?.message);
            return;
        }
        setLoader(false);
    };
    const selectAChat = (chat: Chat) => {
        setSelectedChat(chat);
    };
    useEffect(() => {
        getAllMessages();
    }, []);

    return (
        <div className="flex w-full justify-between overflow-hidden">
            {/* Customers will be shown here */}
            <div className="flex flex-col min-w-[180px]  w-[20%] border-r">
                <div
                    className="overflow-hidden border-b border-black flex items-center justify-between p-3 opacity-65 gap-10">
                    <div className="flex items-center gap-2 ">
                        <Menu className="h-6 w-6"/>
                        <h1 className="text-xl font-semibold">Conversations</h1>
                    </div>
                    <RotateCw
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => {
                            getAllMessages();
                        }}
                    />
                </div>

                <ChatCustomers chats={chats} selectAChat={selectAChat}/>
            </div>

            {selectedChat ? (
                <>
                    {/* Main chat section */}
                    <ChatDock chat={selectedChat} updateChat={updateChat} pageDetails={pageDetails}/>
                    {/* Personal Info */}

                    <div className="w-[22%]">
                        <CustomerInformation chat={selectedChat}/>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default ChatPortal;