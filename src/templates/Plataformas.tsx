import XboxIcon from "../assets/xbox-icon.svg"
import Steam from "../assets/Steam_icon_logo.svg.png"
import Twitch from "../assets/twitch.svg"
import Retro from "../assets/Play-Achievements.png"

export default function Plataformas(props: { modo: any, setUrlModal: any, url: any }) {
    const platforms = [
        {
            name: "Xbox",
            icon: XboxIcon,
            urlField: "url_xbox",
            hrefPrefix: "https://www.xbox.com/pt-BR/play/user/",
            bg: "bg-green-600 hover:bg-green-700",
            textHover: "hover:text-green-200",
        },
        // {
        //     name: "PSN",
        //     icon: Sony,
        //     urlField: "url_psn",
        //     hrefPrefix: "",
        //     bg: "bg-blue-600 hover:bg-blue-700",
        //     textHover: "hover:text-blue-200",
        // },
        {
            name: "Steam",
            icon: Steam,
            urlField: "url_steam",
            hrefPrefix: "https://steamcommunity.com/profiles/",
            bg: "bg-sky-600 hover:bg-sky-700",
            textHover: "hover:text-sky-200",
        },
        {
            name: "Retro Achievements",
            icon: Retro,
            urlField: "url_retro",
            hrefPrefix: "https://retroachievements.org/user/",
            bg: "bg-sky-600 hover:bg-sky-700",
            textHover: "hover:text-sky-200",
        },
        // {
        //     name: "Nintendo",
        //     icon: Nintendo,
        //     urlField: "url_nintendo",
        //     hrefPrefix: "",
        //     bg: "bg-red-600 hover:bg-red-700",
        //     textHover: "hover:text-red-200",
        // },
        {
            name: "Twitch",
            icon: Twitch,
            urlField: "url_twitch",
            hrefPrefix: "https://www.twitch.tv/",
            bg: "bg-purple-600 hover:bg-purple-700",
            textHover: "hover:text-purple-200",
        },
    ];

    const urlsToShow = platforms.filter((p) => props.url?.[p.urlField]);

    return (
        <div className="absolute w-full h-full flex flex-col items-center justify-center bg-[#242428] text-white rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-lg shadow-purple-500/20 p-6">
            {urlsToShow.length === 0 ? (
                <p className="text-gray-400 text-center p-4">
                    Nenhum link associado ainda.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md mx-auto">
                    {urlsToShow.map((platform) => {
                        const url = `${platform.hrefPrefix}${props.url[platform.urlField]}`;
                        return (
                            <a
                                key={platform.name}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl shadow-md ${platform.bg} w-full min-w-[200px] h-16 transition-transform transform hover:scale-105`}
                            >
                                <img
                                    src={platform.icon}
                                    className="h-7 w-7 rounded-full bg-white p-1 flex-shrink-0"
                                />
                                <span
                                    className={`font-semibold tracking-wide transition-colors ${platform.textHover}`}
                                >
                                    {platform.name}
                                </span>
                            </a>
                        );
                    })}
                </div>

            )}

            {props.modo === "editar" && (
                <button
                    onClick={() => props.setUrlModal(true)}
                    className="mt-6 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg transition"
                >
                    Editar Links
                </button>
            )}
        </div>
    );
}
