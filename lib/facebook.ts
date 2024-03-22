import prisma from "@/lib/prisma";
import axios from "axios";

export type facebookResponse = {
    success: boolean,
    message: any,
    authStatus: boolean
};

export async function sendMessage(pageId: string, dbUserId: number, clientId: string, message: string, accessToken: string) {
    const dataToSend = {
        recipient: {id: clientId},
        messaging_type: "RESPONSE",
        message: {text: message.trim()},
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
        // @ts-ignore
        const errorCode = error?.response?.data?.error?.code;
        if (errorCode === 190) {
            await prisma.facebookPage.delete({
                where: {
                    pageId: pageId,
                }
            });
            return {
                success: false,
                message: 'Page access token has expired ... please reconnect to facebook page',
                authStatus: false
            };
        }
        return {success: false, message: error, authStatus: true};

    }

    try {
        await prisma.message.create({
            data: {
                message: message,
                senderId: pageId,
                pageId: pageId,
                userId: dbUserId
            }
        });
    } catch (error) {
        return {success: false, message: error, authStatus: true};
    }
    return {success: true, message: "Message sent successfully", authStatus: true};
};
export const fbGraphApi = axios.create({
    baseURL: 'https://graph.facebook.com/v19.0',
    withCredentials: false,
});

// export async function getPages(pageId:string) {
//     try {
//         const : any = await prisma.facebookPage.findMany({where: {pageId: pageId}});
//
//         const messagesGroupedBySenders = allMessages.reduce((acc: any, item: any) => {
//             if (!acc[item.clientId]) {
//                 acc[item.clientId] = {
//                     clientId: item.clientId,
//                     pageId: item.pageId,
//                     messages: [],
//                 };
//             }
//             acc[item.clientId].messages.push({
//                 message: item.message,
//                 senderId: item.senderId,
//                 time: item.createdAt,
//             });
//             return acc;
//         }, {});
//         const payload = Object.values(messagesGroupedBySenders);
//         return {
//             success: true,
//             message: payload,
//             authStatus: true
//         };
//     } catch (error) {
//         return {
//             success: false,
//             message: error,
//             authStatus: true
//         };
//     }
// }