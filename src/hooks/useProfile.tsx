import { useEffect, useState } from "react";
import { getGame } from "../services/game";
import useDebounce from "./useDebounce";
import { editarUrl, getUrlByUser } from "../services/url";
import { logadoAsync } from "../services/auth";
import { editarUsuario, getUsuarioByUsername } from "../services/usuario";
import { editarFavorite, getFavoriteByUser } from "../services/favorite";

export type FavoGame = {
    ord: number;
    data: {
        titulo: string | null;
        url: string | null;
    } | null;
};

type GameData = {
    titulo: string;
    url: string;
};

export default function useProfile() {
    const [data, setData] = useState<any[] | null>(null)
    const [search, setSearch] = useState("")
    const [favoGames, setFavoGames] = useState<FavoGame[]>([
        { ord: 1, data: null },
        { ord: 2, data: null },
        { ord: 3, data: null },
        { ord: 4, data: null },
        { ord: 5, data: null },
    ]);
    const [favId, setFavId] = useState<null | number>(null)
    const [actualCircle, setActualCircle] = useState<number>(-1)
    const [modal, setModal] = useState(false)
    const [urlModal, setUrlModal] = useState(false)
    const [avatarModal, setAvatarModal] = useState(false)
    const [bioModal, setBioModal] = useState(false)
    const [modo, setModo] = useState("ver")
    const [flipped, setFlipped] = useState(false);
    const [urls, setUrls] = useState<any>(null)
    const [profileData, setProfileData] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [naoEncontrado, setNaoEncontrado] = useState(false)



    const toggleFlip = () => setFlipped(!flipped);

    const toggleFavoriteCircle = (ord?: number) => {

        if (modo == "editar") {
            if (typeof ord === "number" && ord >= 0) {
                setModal(true);
                setActualCircle(ord);
            } else {
                setModal(false);
                setActualCircle(-1);
            }
        }
    };

    const toggleModo = () => {
        if (modo == "ver") {
            setModo("editar")
        } else if (modo == "editar") {
            setModo("ver")
        }
    }


    const findGame = async () => {

        if (search != "") {

            try {
                const resp = await getGame(search)
                setData(resp.data.dados.slice(0, 3))
            } catch (error) {
                console.log(error)
            }
        } else {
            setData(null)
        }
    }

    const ordToField = (ord: number) => {
        switch (ord) {
            case 1: return "primeiro";
            case 2: return "segundo";
            case 3: return "terceiro";
            case 4: return "quarto";
            case 5: return "quinto";
            default: return "";
        }
    };

    const setFavoGameByOrd = async (gameData: GameData) => {
        setFavoGames((prev) => {
            const newArray = [...prev];
            const idx = newArray.findIndex((g) => g.ord === actualCircle);

            if (idx !== -1) {
                newArray[idx] = { ord: actualCircle, data: gameData };
            } else if (newArray.length < 5) {
                newArray.push({ ord: actualCircle, data: gameData });
            }

            return newArray;
        });


        try {
            await editarFavorite({
                id: favId,
                usuario_id: profileData.id,
                [`${ordToField(actualCircle)}_jogo_titulo`]: gameData.titulo,
                [`${ordToField(actualCircle)}_jogo_url`]: gameData.url,
            });
        } catch (err) {
            console.error("Erro ao salvar favorito:", err);
        }
    };

    const getUrls = async (id: number) => {
        const resp = await getUrlByUser(id)
        if (resp.data.dados) {
            setUrls(resp.data.dados)
            await getFavoGames(id)
        }
    }

    const saveUrls = async (data: any) => {
        if (!urls || !profileData) return;

        const mappedData = {
            id: urls.id,
            usuario_id: profileData.id,
            url_steam: data.steam ?? "",
            url_psn: data.psn ?? "",
            url_xbox: data.live ?? "",
            url_nintendo: data.nintendo ?? "",
            url_twitch: data.twitch ?? "",
            url_retro: data.retro ?? ""
        };

        await editarUrl(mappedData)
        await getUrls(profileData.id)
    }

    const getMyProfile = async () => {
        setLoading(true)
        const resp = await logadoAsync()
        if (resp.data.user) {
            setProfileData(resp.data.user)
            await getUrls(resp.data.user.id)
        }
    }



    const getProfile = async (username: string) => {
        setLoading(true)
        try {
            const resp = await getUsuarioByUsername(username)
            setProfileData(resp.data.dados)
            await getUrls(resp.data.dados.id)
        } catch (error: any) {
            if (error.status == 404) {
                setNaoEncontrado(true)
                setLoading(false)
            }
        }
    }

    const saveProfile = async (data: any) => {

        if (!profileData) return;

        const mappedData = {
            id: profileData.id,
            usuario: data.usuario,
            avatar_url: data.avatar_url,
            texto_bio: data.texto_bio
        }

        await editarUsuario(mappedData)
        await getMyProfile()
    }

    const getFavoGames = async (id: number) => {
        const resp = await getFavoriteByUser(id)
        if (resp.data.dados) {
            const fav = resp.data.dados;

            const mapped: FavoGame[] = [
                { ord: 1, data: { titulo: fav.primeiro_jogo_titulo, url: fav.primeiro_jogo_url } },
                { ord: 2, data: { titulo: fav.segundo_jogo_titulo, url: fav.segundo_jogo_url } },
                { ord: 3, data: { titulo: fav.terceiro_jogo_titulo, url: fav.terceiro_jogo_url } },
                { ord: 4, data: { titulo: fav.quarto_jogo_titulo, url: fav.quarto_jogo_url } },
                { ord: 5, data: { titulo: fav.quinto_jogo_titulo, url: fav.quinto_jogo_url } },
            ];

            console.log(mapped)

            setFavId(resp.data.dados.id)
            setFavoGames(mapped);
        }

        setLoading(false)
    }

    const handleFind = useDebounce(findGame, 300)

    useEffect(() => {
        handleFind()
    }, [search])


    return {
        search,
        data,
        modal,
        favoGames,
        modo,
        flipped,
        urlModal,
        urls,
        profileData,
        loading,
        avatarModal,
        bioModal,
        naoEncontrado,
        getProfile,
        setBioModal,
        saveProfile,
        setAvatarModal,
        setFlipped,
        getMyProfile,
        setUrlModal,
        toggleFlip,
        toggleModo,
        setModo,
        setData,
        toggleFavoriteCircle,
        setSearch,
        handleFind,
        setFavoGameByOrd,
        saveUrls,
        getUrls
    }
}