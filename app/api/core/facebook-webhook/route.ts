import {NextRequest, NextResponse} from "next/server";

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
        await fetch('https://webhook.site/e0e9f526-575d-4e8c-a435-f4ed54c26d82', {
            method: "POST",
            body: JSON.stringify(body)
        });
        console.log('WEBHOOK: ', body);
        if (body.object === "page") {
            return new NextResponse('EVENT_RECEIVED', {status: 2000});
        }

        return new NextResponse('Not Found', {status: 404})
    } catch (error) {
        return new NextResponse('Not Found', {status: 404})
    }
}