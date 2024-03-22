import React, {useEffect, useRef, useState} from "react";
import {getDate, getTime, showError} from "@/lib/utils";
import {SendHorizontal} from "lucide-react";
import Card from "@/components/ui/card";
import Image from "next/image";
import NewButton from "@/components/ui/buttonNew";
import {Chat, ChatMessages, SinglePageType} from "@/types/facebook";

const SelfMessage = ({chat}: { chat: ChatMessages }) => {
    return (
        <div className="text-black text-left ml-auto p-2 flex flex-col items-end w-full">
            {/* Chats will go here */}
            <div className="flex gap-4 justify-end">
                <div className="flex flex-col gap-4  items-end max-w-[100%]">
                    {chat?.messages?.map((mess, j) => (
                        <Card key={j} className="py-2 px-4 shadow-sm">
                            {mess}
                        </Card>
                    ))}
                </div>
                <div className="mt-auto">
                    <Image alt="user" src={chat.senderPicture} className="h-10 w-10"/>
                </div>
            </div>
            <div className="flex gap-2 justify-end mr-14 mt-2 ">
                <span className="font-medium">{chat?.senderName} •</span>
                <span>
          {getDate(chat?.time)}, {getTime(chat?.time)}
        </span>
            </div>
        </div>
    );
};

const OthersMessage = ({chat}: { chat: ChatMessages }) => {
    return (
        <div className="text-black text-left p-2 flex flex-col items-start w-full">
            {/* Chats will go here */}

            <div className="flex gap-4 w-full justify-start">
                <div className="mt-auto">
                    <Image alt="user" src={chat.senderPicture} className="h-10 w-10"/>
                </div>
                <div className="flex flex-col gap-4 items-start  max-w-[60%]">
                    {chat?.messages?.map((message, index) => (
                        <Card key={index} className="py-2 px-4 shadow-sm ">
                            {message}
                        </Card>
                    ))}
                </div>
            </div>

            <div className="flex gap-2 justify-end ml-16 mt-2">
                <span className="font-medium">{chat?.senderName} •</span>
                <span className="opacity-60">
          {getDate(chat?.time)}, {getTime(chat?.time)}
        </span>
            </div>
        </div>
    );
};

const ChatDock = ({chat, updateChat, pageDetails}: { chat: Chat, updateChat: any, pageDetails: SinglePageType }) => {
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [showDownBtn, setShowDownBtn] = useState(false);
    const [messages, setMessages] = useState<ChatMessages[]>([]);

    const chatBoxRef = useRef();

    const changeNewMessage = (e: any) => {
        setNewMessage(e.target.value);
    };

    const sendNewMessage = async () => {
        if (newMessage.trim() === "") {
            return;
        }
        try {
            setLoading(true);

            const pageAccessToken = pageDetails.accessToken;
            const pageId = pageDetails.pageId;
            const dataToSend = {
                pageId: pageId,
                senderId: chat.senderId,
                message: newMessage,
                accessToken: pageAccessToken,
            };
            await fetch('/api/core/message', {
                method: "POST",
                body: JSON.stringify(dataToSend)
            })

            updateChat(chat.senderId, pageId, newMessage);
            setNewMessage("");
        } catch (error) {
            setLoading(false);
            //@ts-ignore
            showError(error?.response?.data?.message);
        }
        goToBottomOfTheChat();
        setLoading(false);
    };

    const goToBottomOfTheChat = () => {
        if (chatBoxRef.current) {
            //@ts-ignore
            chatBoxRef.current.scrollTop = chatBoxRef.current?.scrollHeight;
            setShowDownBtn(false);
        }
    };

    const getGroupedMessages = () => {
        const selectedChatMessage = [];
        const clientName = chat.client.name;
        const clientPicture = chat.client.profile_pic;
        const pageName = pageDetails.name;
        const pageId = pageDetails.pageId;

        let currMessageGroup = {
            senderName: clientName,
            senderPicture: clientPicture,
            senderId: chat.messages[0].senderId,
            time: chat.messages[0]?.time,
            messages: [chat.messages[0]?.message],
        };

        chat.messages.forEach((item, i) => {
            if (i > 0) {
                if (item.senderId === currMessageGroup.senderId) {
                    currMessageGroup.messages.push(item.message);
                    currMessageGroup.time = item.time;
                } else {
                    selectedChatMessage.push(currMessageGroup);
                    currMessageGroup = {
                        senderName: item.senderId === pageId ? pageName : clientName,
                        senderId: item.senderId,
                        senderPicture: clientPicture,
                        time: item.time,
                        messages: [item.message],
                    };
                }
            }
        });
        selectedChatMessage.push(currMessageGroup);
        //@ts-ignore
        setMessages(selectedChatMessage);
    };

    useEffect(() => {
        goToBottomOfTheChat();
        getGroupedMessages();
    }, [chat]);

    return (
        <div className="flex flex-col w-[60%] relative bg-[#F6F6F6]">
            {/* Name of the customer goes here */}
            <div className="flex w-full p-3 border-b border-black">
                <h1 className="text-xl font-semibold opacity-65 ">
                    {chat?.client?.name}
                </h1>
            </div>

            {/* Chat goes here */}
            <div
                //@ts-ignore
                ref={chatBoxRef}
                className="flex flex-col items-start gap-2 pb-20 relative  p-3 overflow-scroll h-[80%]"
            >
                {messages?.map((data, i) => {
                    if (data.senderId === pageDetails.pageId) {
                        return <SelfMessage key={i} chat={data}/>;
                    } else {
                        return <OthersMessage key={i} chat={data}/>;
                    }
                })}
            </div>

            {/* Send message */}
            <form
                className="w-[97%] absolute left-[50%] bottom-5 translate-x-[-50%]"
                onSubmit={(e) => {
                    e.preventDefault();
                    sendNewMessage();
                }}
            >
                <input
                    className="w-full border border-primary rounded-md p-2 "
                    placeholder="Message Ankit Sinha"
                    value={newMessage}
                    onChange={(e) => {
                        changeNewMessage(e);
                    }}
                />
                <NewButton
                    className="absolute right-0 top-0"
                    type="submit"
                    loading={loading}
                    disabled={loading}
                >
                    <SendHorizontal/>
                </NewButton>
            </form>
        </div>
    );
};

export default ChatDock;