import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {getServerSession} from "next-auth";
import {nextAuthOptions} from "@/utils/nextAuth/nextAuthOptions";

export async function POST(request: Request) {
    const body = await request.json();
    const session = await getServerSession(nextAuthOptions);

    const user = await prisma.user.update({
        where: {
            id: Number(session.id)
        },
        data: {
            facebookUserId: body.id,
            facebookEmail: body.email,
            facebookPicture: body.picture.data.url ?? null,
        },
    });
    return NextResponse.json({success: true, errors: [], user: user});

}
