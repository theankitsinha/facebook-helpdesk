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
        // const data = new FbWebhook({temp: JSON.stringify(body)});
        // await data.save();
        return NextResponse.json({}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Webhook Failed."}, {status: 500});
    }
}