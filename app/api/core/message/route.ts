import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";
import {getServerSession} from "next-auth";
import {nextAuthOptions} from "@/utils/nextAuth/nextAuthOptions";

export async function GET(request: NextRequest) {
    let pageId = request.nextUrl.searchParams.get("pageId");
    if (!pageId) {
        return NextResponse.json([]);
    }
    const allMessages: any = await prisma.message.findMany({
        where: {
            pageId: pageId,
        }
    });
    if (!allMessages) {
        return NextResponse.json([]);
    }
    const messagesGroupedBySenders = allMessages.reduce((acc: any, item: any) => {
        if (!acc[item.senderId]) {
            acc[item.senderId] = {
                clientId: item.pageId,
                senderId: item.senderId,
                pageId: item.pageId,
                messages: [],
            };
        }

        acc[item.senderId].messages.push({
            message: item.message,
            clientId: item.pageId,
            senderId: item.senderId,
            time: item.createdAt,
        });
        return acc;
    }, {});
    const payload = Object.values(messagesGroupedBySenders);
    return NextResponse.json((payload));
}


export async function POST(request: NextRequest) {
    const body = await request.json();
    const session = await getServerSession(nextAuthOptions);
    const pageId = body.pageId;
    const message = body.message.trim();
    const accessToken = body.accessToken;
    const dataToSend = {
        recipient: {id: body.senderId},
        messaging_type: "RESPONSE",
        message: {text: message},
    };
    try {
        await axios.post(
            `https://graph.facebook.com/v19.0/${pageId}/messages`,
            dataToSend,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
    } catch (error) {
        console.error("Send New Message API: " + JSON.stringify(error));
    }
    await prisma.message.create({
        data: {
            message: message,
            senderId: pageId,
            pageId: pageId,
            userId: Number(session.id)
        }
    });
    return NextResponse.json({success: true, message: "Message sent successfully", authStatus: true});
}
