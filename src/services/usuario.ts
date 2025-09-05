import type { profile } from "../types/profile";
import { getRequest, postRequest, putRequest } from "./requests";

export const criarUsuario = async (data: profile) => {
    return await postRequest("/usuario", data)
}

export const criarSuperUsuario = async (data: profile) => {
    return await postRequest("/usuario/default", data)
}

export const editarUsuario = async (data: any) => {
    return await putRequest("/usuario", data)
}

export const getUsuario = async (id: number) => {
    return await getRequest("/usuario/" + id)
}

export const getUsuarioByUsername = async (user: string) => {
    return await getRequest("/usuario/find/" + user)
}
