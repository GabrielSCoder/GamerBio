import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";

export default function FavoriteGameModal(props: {
    modal: boolean; setModal: any, findGame: any, setSearch: any, data: any, setFavoGameByOrd: any,
    setData: any
}) {

    const [tempGame, setTempGame] = useState<any>({ name: "", image_url: "" })

    const selectGame = (game: any) => {
        setTempGame(game)
    }

    const resetSelection = () => {
        props.setData(null)
        setTempGame({ name: "", image_url: "" });
    };

    const gameList = () => {

        return props.data.map((game: any, index: number) => (
            <div key={index} className="p-2 border-b border-cyan-500/20 hover:cursor-pointer" onClick={() => selectGame(game)}>
                <h2 className="text-cyan-400 font-bold">{game.name}</h2>
            </div>
        ));
    }

    return (
        <AlertDialog.Root open={props.modal} onOpenChange={props.setModal}>
            <AlertDialog.Portal>

                <AlertDialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />



                <AlertDialog.Content
                    className="
        fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        max-w-md w-[90vw] max-h-[85vh] rounded-xl
        bg-gray-900 border border-cyan-400 p-6
        shadow-xl shadow-cyan-500/50
        focus:outline-none
        flex flex-col gap-4 z-50
      "
                >
                    <AlertDialog.Title className="text-xl font-bold text-cyan-400 mb-2">
                        Escolha um jogo!
                    </AlertDialog.Title>

                    <AlertDialog.Description>

                    </AlertDialog.Description>

                    {tempGame.name != "" ? (
                        <div className="flex flex-col gap-3">
                            <input
                                id="jogo"
                                type="text"
                                value={tempGame.name}
                                readOnly
                                className="w-full px-3 py-2 rounded-lg bg-[#242428] border border-gray-600
                       focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                            />
                            <button
                                onClick={resetSelection}
                                className="px-3 py-1 w-max bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition"
                            >
                                Editar
                            </button>
                        </div>
                    ) : (
                        <>

                            <input
                                id="jogo"
                                type="text"
                                name="jogo"
                                placeholder="Insira um nome aqui."
                                onChange={(e) => props.setSearch(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-[#242428] border border-gray-600
                     focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                            />
                        </>
                    )}

                    {!tempGame.name && (
                        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                            {props.data && props.data.length > 0 ? (
                                gameList()
                            ) : (
                                <p className="text-gray-400 mt-2">Nenhum jogo encontrado</p>

                            )}
                            <p className="text-gray-400 text-sm">Para excluir, confirme com o campo vazio.</p>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 mt-4">

                        <AlertDialog.Cancel asChild>
                            <button
                                className="px-4 py-2 rounded-md border border-purple-400 text-purple-400
                 hover:bg-purple-500/20 transition-all duration-200"
                            >
                                Cancelar
                            </button>
                        </AlertDialog.Cancel>


                        <AlertDialog.Action asChild>
                            <button
                                className="px-4 py-2 rounded-md border border-pink-400 bg-pink-500 text-white
                 hover:bg-pink-600 transition-all duration-200"
                                onClick={() => {
                                    // if (tempGame) {
                                    console.log(tempGame),
                                        props.setFavoGameByOrd({
                                            titulo: tempGame.name,
                                            url: tempGame.image_url
                                        });
                                    resetSelection()
                                    props.setModal(false);
                                    // }
                                }}
                            >
                                Confirmar
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>

    );
}
