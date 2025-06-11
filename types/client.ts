export interface Client {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface ClientLocalData {
    rating: number;
    comment: string;
}

export interface ClientWithLocalData extends Client, ClientLocalData {
}

export interface ReqResResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Client[];
}
