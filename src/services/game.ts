import { getRequest } from "./requests"

export const getGame = async (game: string) => {
    return await getRequest("game/find/" + game)
}
