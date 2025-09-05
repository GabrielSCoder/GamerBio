import { useState } from "react";
import Avatar from "../components/Avatar";
import classNames from "../util/classNames";
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

            <div className="absolute w-full h-full flex flex-col items-center justify-start bg-[#242428] text-white rounded-xl [backface-visibility:hidden] shadow-lg shadow-cyan-500/20 p-4">

                <div className="flex flex-col items-center justify-center w-full h-[250px]">
                    <Avatar ProfileAvatarUrl={props.profileData.avatar_url} modo={props.modo} onEdit={props.setAvatarModal} />
                    <h1 className={h1Style}>
                        {props.profileData.usuario}
                    </h1>
                    {props.modo == "editar" ? <button className="p-2" onClick={() => props.setBioModal(true)}>Editar usuário</button> : ""}
                </div>


                <div className="flex flex-col h-[250px] bg-[#202024] m-4 mx-10 rounded-2xl gap-2 p-4 shadow-inner shadow-black/50 w-full [will-change:transform]">
                    <p className="text-gray-300 text-lg leading-relaxed h-full m-0 p-0 whitespace-pre-line break-words antialiased [will-change:transform]">
                        {props.profileData.texto_bio ?? "biografia vazia"}
                    </p>
                </div>
            </div>


            <Plataformas modo={props.modo} setUrlModal={props.setUrlModal} url={props.urls} />
        </div>
    )
}