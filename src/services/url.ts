import { getRequest, postRequest, putRequest } from "./requests";

export const criarUrl = async (data: any) => {
    return await postRequest("/url", data)
}

export const editarUrl = async (data: any) => {
    return await putRequest("/url", data)
}

export const getUrl = async (id: number) => {
    return await getRequest("/url/" + id)
}

export const getUrlByUser = async (id: number) => {
    return await getRequest("/url/user/" + id)
}

