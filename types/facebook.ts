import {DateTime} from "next-auth/providers/kakao";

export type AccountGetApiResponse = {
    data: AccountPageResponse[]
    paging: Paging
}

export interface MessageResponse {
    client?: any
    senderId: string
    pageId: string
    messages: Message[]
}

export interface SinglePageType {
    id: number
    pageId: string
    name: string
    accessToken: string
    userId: number
    facebookUserId: any
    createdAt: string
    updatedUt: string
}


export interface Chat {
    senderId: string
    pageId: string
    messages: Message[]
    client: Client
}

export interface Client {
    name: string
    first_name: string
    last_name: string
    profile_pic: string
    id: string
}

export interface ChatMessages {
    senderName: string
    senderPicture: string
    senderId: string
    time: string
    messages: string[]
}

export type Message = {
    message: string
    senderId: string
    time: string | DateTime | Date
}

export type AccountPageResponse = {
    access_token: string
    category: string
    category_list: CategoryList[]
    name: string
    id: string
    tasks: string[]
}

export type PageResponse = {
    pageId: string
    name: string
}

export interface CategoryList {
    id: string
    name: string
}

export interface Paging {
    cursors: Cursors
}

export interface Cursors {
    before: string
    after: string
}
