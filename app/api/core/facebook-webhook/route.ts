import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    // AUTH
    let token = req.nextUrl.searchParams.get("hub.verify_token");
    let mode = req.nextUrl.searchParams.get("hub.mode");
    let challenge = req.nextUrl.searchParams.get("hub.challenge");
    if (mode && token) {
        if (mode === "subscribe" && token === "f@cBo0K-t0keN") {
            return NextResponse.json(Number(challenge), {status: 200});
        } else {
            return NextResponse.json({message: "This mode not supported!"}, {status: 403});
        }
    }
    // Duplicate check
    const body = req.body;
    if (!body) {
        return NextResponse.json({message: "No Content!"}, {status: 200});
    }
    console.log(body);
    try {
        return NextResponse.json({}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Webhook Failed."}, {status: 500});
    }
}

export const POST = async (req: Request, res: Response) => {
    try {
        const body = await req.json();
        try {
            if (body?.entry) {
                const entry = body?.entry[0];
                const senderId = entry?.messaging[0]?.sender?.id;
                const pageId = entry?.messaging[0]?.recipient?.id;
                const message = entry?.messaging[0]?.message?.text;
                const getPageId = await prisma.facebookPage.findFirst({
                    where: {
                        pageId: pageId
                    },
                    select: {
                        id: true,
                    }
                });
                if (!getPageId) {
                    console.error("Page Not Found ID: " + pageId);
                    return new NextResponse('PAGE_NOT_ADDED', {status: 404});
                }
                const insertIntoDB = await prisma.message.create({
                    data: {
                        message: message,
                        senderId: senderId,
                        facebookUserId: senderId,
                        pageId: getPageId.id,
                        // userId: userId
                    }
                });
            }
            return new NextResponse('EVENT_RECEIVED', {status: 200});
        } catch (error) {
            console.log(error);
        }
        return new NextResponse('Not Found', {status: 404})

    } catch (error) {
        return new NextResponse('Not Found', {status: 404})
    }
}