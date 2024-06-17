import axios from "@/lib/axios";
import { AxiosResponse } from "axios";
import { GetMasterDataParams } from "../local-type/master-data.type";

export const getAllRuas = (params: GetMasterDataParams) => {
    return axios<any, AxiosResponse, any>({
        url: import.meta.env.VITE_API_DOMAIN + "/ruas",
        method: "get",
        params
    });
};

export const GetOneRuas = (id: number) => {
    return axios<any, AxiosResponse, any>({
        url: import.meta.env.VITE_API_DOMAIN + "/ruas/" + id,
        method: "get"
    });
};

export const addRuas = (data: FormData) => {
    return axios({
        url: import.meta.env.VITE_API_DOMAIN + "/ruas",
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    });
};

export const updateRuas = (id: number, data: FormData) => {
    return axios({
        url: import.meta.env.VITE_API_DOMAIN + "/ruas/" + id,
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    });
};

export const deleteRuas = (id: number) => {
    return axios({
        url: import.meta.env.VITE_API_DOMAIN + "/ruas/" + id,
        method: "delete",
    });
};
