import {NextResponse} from "next/server";
import {RegisterFormSchema} from "@/types/form";
import prisma from "@/lib/prisma";
import {getHashedPassword} from "@/lib/bcrypt";

export async function POST(request: Request) {
    const body = await request.json();
    const result = RegisterFormSchema.safeParse(body);
    if (result.success) {
        const user = await prisma.user.create({
            data: {
                email: result.data.email,
                name: result.data.name,
                password: getHashedPassword(result.data.password),
            },
        });
        return NextResponse.json({success: true, errors: [], user: user});
    }
    const serverErrors = Object.fromEntries(
        result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
    );
    return NextResponse.json({success: false, errors: serverErrors, user: []});
}
