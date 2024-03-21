import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    const body = await request.json();
    const user = await prisma.user.findFirst({where: {email: body.email}, select: {id: true}});
    return NextResponse.json({isEmailPresent: !!user});
}
