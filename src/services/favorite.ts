import { getRequest, postRequest, putRequest } from "./requests";

export const criarFavorite = async (data: any) => {
    return await postRequest("/favorite", data)
}

export const editarFavorite = async (data: any) => {
    return await putRequest("/favorite", data)
}

export const getFavorite = async (id: number) => {
    return await getRequest("/favorite/" + id)
}

export const getFavoriteByUser = async (id: number) => {
    return await getRequest("/favorite/user/" + id)
}

