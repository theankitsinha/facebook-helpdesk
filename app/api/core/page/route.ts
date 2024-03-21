import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {nextAuthOptions} from "@/utils/nextAuth/nextAuthOptions";
import {getServerSession} from "next-auth";

export async function GET(request: Request) {
    const session = await getServerSession(nextAuthOptions);
    const facebookPages = await prisma.facebookPage.findMany(
        {
            where: {
                userId: Number(session.id),
            }
        });
    return NextResponse.json(facebookPages);
}

export async function POST(request: Request) {
    const session = await getServerSession(nextAuthOptions);
    const res = await request.json();
    const facebookPage = await prisma.facebookPage.create({
        data: {
            pageId: res.pageId,
            name: res.name,
            accessToken: res.accessToken,
            userId: Number(session.id),
        },
    })
    return NextResponse.json({status: true, facebookPage});
}

export async function DELETE(request: Request) {
    const session = await getServerSession(nextAuthOptions);
    const res = await request.json();
    const facebookPage = await prisma.facebookPage.delete({
        where: {
            pageId: res.pageId,
            userId: Number(session.id)
        },
    })
    return NextResponse.json({status: true, facebookPage});
}
