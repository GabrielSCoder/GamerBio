import BioCard from "../templates/BioCard";
import GamesFavoritos from "../templates/GamesFavoritos";
import { useEffect, useState } from "react";
import FavoriteGameModal from "../templates/FavoriteGameModal";
import useProfile from "../hooks/useProfile";
import UrlModal from "../templates/UrlModal";
import ConfirmModal from "../templates/ConfirmacaoModal";
import AvatarModal from "../templates/AvatarModal";
import UsuarioBioModal from "../templates/UsuarioBioAvatar";
import { useNavigate, useParams } from "react-router";
import PerfilNaoEncontrado from "../templates/PerfilDesconhecido";
import Loading from "../components/Loading";
import useData from "../hooks/useData";


export default function Profile() {

    const { usuario } = useParams()
    const nav = useNavigate()

    const { setSearch, handleFind, setFavoGameByOrd, modal, data, favoGames, toggleFavoriteCircle, setData, modo, toggleModo, flipped, toggleFlip, urlModal,
        setUrlModal, saveUrls, loading, urls, profileData, setFlipped, avatarModal, setAvatarModal, saveProfile, bioModal, setBioModal, getProfile, naoEncontrado } = useProfile()

    const { LogadoProfileData, logado, logout } = useData()

    const [linksTemp, setLinksTemp] = useState({
        steam: "",
        psn: "",
        live: "",
        nintendo: "",
        twitch: "",
        retro: ""
    });

    const [pfTemp, setPfTemp] = useState({
        usuario: "",
        avatar_url: "",
        texto_bio: ""
    })

    const [confirmModal, setConfirmModal] = useState(false)
    const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

    const handleSaveUrls = () => {
        setConfirmAction(() => () => saveUrls(linksTemp));
        setConfirmModal(true);
    };


    const handleSaveAvatar = () => {
        setConfirmAction(() => () => saveProfile(pfTemp));
        setConfirmModal(true);
    };

    useEffect(() => {
        if (urls) {
            setLinksTemp({
                steam: urls.url_steam ?? "",
                psn: urls.url_psn ?? "",
                live: urls.url_xbox ?? "",
                nintendo: urls.url_nintendo ?? "",
                twitch: urls.url_twitch ?? "",
                retro: urls.url_retro ?? "",
            });
        }
    }, [urls]);

    useEffect(() => {
        if (profileData) {
            setPfTemp({
                avatar_url: profileData.avatar_url,
                texto_bio: profileData.texto_bio,
                usuario: profileData.usuario
            });
        }
    }, [profileData]);


    useEffect(() => {
        if (modo === "ver" && flipped) {
            setFlipped(false)
        }
    }, [modo]);

    useEffect(() => {
        if (usuario != undefined)
            getProfile(usuario)
    }, [])

    if (naoEncontrado) {
        return <PerfilNaoEncontrado />
    }

    if (loading || !profileData || !urls) {
        return (<Loading />)
    }

    return (
        <>
            <div className="flex-col relative hidden lg:flex">

                {modo === "editar" && <button className="p-2 hover:cursor-pointer self-center text-center absolute top-0 left-1 z-20" onClick={() => toggleFlip()}>Girar</button>}
                <div className="group [perspective:1000px] w-[500px] h-[500px]">
                    <BioCard modo={modo} flipped={flipped} toggleFlip={toggleFlip} setUrlModal={setUrlModal} profileData={profileData} urls={urls} setAvatarModal={setAvatarModal}
                        setBioModal={setBioModal}
                    />
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                    <GamesFavoritos setModal={toggleFavoriteCircle} favoGames={favoGames} modo={modo} />
                    {logado && LogadoProfileData && LogadoProfileData.id == profileData.id ? <button className="p-2 hover:cursor-pointer self-center text-center" onClick={() => toggleModo()}>{modo == "ver" ? "Editar" : "Finalizar edição"}</button> : ""}
                </div>

                <div className="fixed bottom-2 right-2">
                    {!logado ? (

                        <button
                            className="p-2 hover:cursor-pointer"
                            onClick={() => nav("/")}
                        >
                            Crie o seu!
                        </button>
                    ) : LogadoProfileData && profileData && LogadoProfileData.id === profileData.id ? (

                        <button
                            className="p-2 hover:cursor-pointer"
                            onClick={() => logout()}
                        >
                            Sair
                        </button>
                    ) : null
                    }
                </div>

                <FavoriteGameModal setSearch={setSearch} findGame={handleFind} data={data} modal={modal} setModal={toggleFavoriteCircle} setFavoGameByOrd={setFavoGameByOrd}
                    setData={setData} />

                <UrlModal
                    modal={urlModal}
                    setModal={setUrlModal}
                    links={linksTemp}
                    setLinks={setLinksTemp}
                    setConfirmModal={handleSaveUrls}
                />

                <ConfirmModal
                    titulo="Confirmar alterações"
                    mensagem="Deseja salvar essas alterações?"
                    modal={confirmModal}
                    setModal={setConfirmModal}
                    onConfirm={() => {
                        if (confirmAction) confirmAction();
                        setUrlModal(false);
                        setBioModal(false)
                        setAvatarModal(false);
                        setConfirmModal(false);
                    }}
                />

                <AvatarModal
                    modal={avatarModal}
                    pfTemp={pfTemp}
                    setModal={setAvatarModal}
                    setPfTemp={setPfTemp}
                    setConfirmModal={handleSaveAvatar}
                />

                <UsuarioBioModal
                    modal={bioModal}
                    setModal={setBioModal}
                    pfTemp={pfTemp}
                    setPfTemp={setPfTemp}
                    setConfirmModal={handleSaveAvatar}
                />
            </div>
            <div className="lg:hidden flex">
                <h5 className="text-4xl text-center font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
                    Versão indisponível para mobile
                </h5>
            </div>
        </>

    )
}