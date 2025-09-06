import React from "react";

type FavoriteGameProps = {
    url?: string;
    nome: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function FavoriteGame({ url, nome, className, ...rest }: FavoriteGameProps) {
    return (
        <div
            {...rest}
            className={`
        group h-[60px] w-[60px] lg:h-[80px] lg:w-[80px] rounded-full relative hover:cursor-pointer 
        hover:scale-105 transition-transform shadow-md 
        hover:shadow-[0_0_20px_rgba(0,255,255,0.8)]
        ${className ?? ""}
      `}
        >
            {url ? (
                <img
                    src={url}
                    className="h-full w-full object-cover rounded-full"
                    style={{ imageRendering: "auto" }}
                />
            ) : (
                <div className="h-full w-full rounded-full bg-black border border-slate-900" />
            )}

            <div
                className="absolute top-0 left-0 h-full w-full rounded-full 
             bg-black/70 flex items-center justify-center 
             opacity-0 group-hover:opacity-100 transition-opacity p-2"
            >
                <h4 className="text-white text-center text-xs font-semibold 
                 drop-shadow-[0_0_6px_rgba(0,255,255,0.9)] break-words">
                    {nome ? nome : "Adicionar"}
                </h4>
            </div>

        </div>
    );
}
