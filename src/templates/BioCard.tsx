import Avatar from "../components/Avatar";
import Plataformas from "./Plataformas";

const h1Style = "text-center text-4xl font-extrabold my-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,255,255,0.7)] leading-tight"

export default function BioCard(props: { modo: any, toggleFlip: any, flipped: boolean, setUrlModal: any, urls: any, profileData: any, setAvatarModal: any, setBioModal: any }) {


    return (
        <div
            className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] [transform:translateZ(0)] [will-change:transform] group ${props.modo === "ver" ? "group-hover:[transform:rotateY(180deg)]" : ""
                }`}
            style={{
                transform:
                    props.modo === "editar"
                        ? props.flipped
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)"
                        : undefined,
            }}
        >
            <div className="absolute w-full h-full flex flex-col items-center justify-start bg-[#242428] text-white rounded-2xl [backface-visibility:hidden] shadow-xl shadow-cyan-500/20 p-6">
                <div className="flex flex-col items-center justify-center w-full h-[300px]">
                    <Avatar
                        ProfileAvatarUrl={props.profileData.avatar_url}
                        modo={props.modo}
                        onEdit={props.setAvatarModal}
                    />
                    <h1 className={h1Style}>
                        {props.profileData.usuario}
                    </h1>
                    {props.modo === "editar" && (
                        <button
                            className="mt-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition text-white text-base"
                            onClick={() => props.setBioModal(true)}
                        >
                            Editar usuário
                        </button>
                    )}
                </div>
                <div className="flex flex-col min-h-[150px] bg-[#202024] m-6 rounded-2xl gap-3 p-6 shadow-inner shadow-black/50 w-full">
                    <p className="text-gray-300 text-xl leading-relaxed h-full whitespace-pre-line break-words antialiased">
                        {props.profileData.texto_bio ?? "biografia vazia"}
                    </p>
                </div>
            </div>
            <Plataformas
                modo={props.modo}
                setUrlModal={props.setUrlModal}
                url={props.urls}
            />
        </div>

    )
}