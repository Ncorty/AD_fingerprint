import axios from "axios";

const URL = import.meta.env.URL || "http://localhost:6000";

export interface Scan {
    id: number;
    user: string;
    isAD: boolean;
    comment: string;
    created_at: Date;
}

export interface User{
    id:number;
    login:string;
    created_at:Date;
}

export interface createScanDto{
    user:string;
    isAD:boolean;
    comment:string;
}

export const api = {
    createUser: (login:string) =>
        axios.post<User>(`${URL}/user`, {login}),
    createScan: (data: createScanDto) =>
        axios.post<Scan>(`${URL}/scans/create`, data),
    getAllScans: (user:string) =>
        axios.get<Scan[]>(`${URL}/scans/getAll`, {params:{user}}),
    deleteScan: (id:number) =>
        axios.delete(`${URL}/scans/delete/${id}`),

}