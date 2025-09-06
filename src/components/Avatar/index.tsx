import { useState } from "react";

export default function Avatar(props: { ProfileAvatarUrl?: string; modo: string; onEdit?: any }) {
    const { ProfileAvatarUrl, modo, onEdit } = props;
    const [hover, setHover] = useState(false);

    return (
        <div
            className="relative rounded-full h-[140px] w-[140px] overflow-hidden flex justify-center items-center 
                border-4 border-transparent bg-gradient-to-r from-cyan-400 to-purple-500 p-[2px] shadow-lg shadow-cyan-500/30
                hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.7)] transition-all duration-300 [transform:translateZ(0)]"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => modo === "editar" && onEdit && onEdit(true)}
        >
            <div className="rounded-full overflow-hidden w-full h-full bg-black relative">
                <img
                    src={
                        ProfileAvatarUrl ||
                        "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
                    }
                    className="h-full w-full object-cover"
                />

                {modo === "editar" && hover && (
                    <div
                        className="absolute top-0 left-0 h-full w-full rounded-full 
                   bg-black/70 flex items-center justify-center 
                   opacity-0 group-hover:opacity-100 transition-opacity hover:cursor-pointer"
                    >
                        <h4 className="text-white text-center text-sm font-semibold 
                       drop-shadow-[0_0_6px_rgba(0,255,255,0.9)]">
                            Editar
                        </h4>
                    </div>
                )}
            </div>
        </div>
    );
}

