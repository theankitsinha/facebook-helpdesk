import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

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
                senderId: item.senderId,
                pageId: item.pageId,
                messages: [],
            };
        }
        acc[item.senderId].messages.push({
            message: item.message,
            senderId: item.senderId,
            time: item.createdAt,
        });
        return acc;
    }, {});
    const payload = Object.values(messagesGroupedBySenders);
    return NextResponse.json((payload));

}
