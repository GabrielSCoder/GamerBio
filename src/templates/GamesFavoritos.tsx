import FavoriteGame from "../components/FavoriteGame";

export default function GamesFavoritos(props: { setModal: any, favoGames: any[], modo: any }) {

    const hasGames = props.favoGames.some(fav => fav.data.titulo || fav.data.url);
    return (
        <>
            <div>
                <h5 className="text-center text-xl font-semibold mt-6 
               bg-gradient-to-r from-pink-400 to-purple-500 
               bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(255,0,255,0.6)]">
                    Meus jogos favoritos
                </h5>

            </div>
            {hasGames || props.modo == "editar" ? (
                <div className="mt-4 h-[100px] md:flex items-center p-2 gap-5 justify-center grid grid-cols-3">
                    {props.favoGames.map((fav) => {

                        const hasData = !!fav.data.titulo;

                        if (props.modo === "ver" && !hasData) {
                            return null;
                        }

                        return (
                            <FavoriteGame
                                key={fav.ord}
                                url={fav.data?.url ?? ""}
                                nome={fav.data?.titulo ?? ""}
                                onClick={() => props.setModal(fav.ord)}
                            />
                        );
                    })}
                </div>

            ) : (
                <div className="flex items-center justify-center h-[100px]">
                    <h2 className="text-gray-400 text-lg font-medium italic">
                        Nenhum jogo cadastrado
                    </h2>
                </div>
            )}

        </>

    )
}