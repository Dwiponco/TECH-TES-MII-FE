import axios from "@/lib/axios";
import { AxiosResponse } from "axios";

export const getAllUnitKerja = () => {
    return axios<any, AxiosResponse, any>({
        url: import.meta.env.VITE_API_DOMAIN + "/unit",
        method: "get",
    });
};