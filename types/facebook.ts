export type AccountGetApiResponse = {
    data: AccountPageResponse[]
    paging: Paging
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
