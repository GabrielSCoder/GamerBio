import * as Dialog from "@radix-ui/react-dialog";

type Props = {
    modal: boolean;
    setModal: (val: boolean) => void;
    pfTemp: { usuario: string; texto_bio: string };
    setPfTemp: (val: any) => void;
    setConfirmModal: (val: boolean) => void;
};

export default function UsuarioBioModal({
    modal,
    setModal,
    pfTemp,
    setPfTemp,
    setConfirmModal,
}: Props) {
    return (
        <Dialog.Root open={modal} onOpenChange={setModal}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[600px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 bg-[#242428] rounded-xl shadow-lg p-6 focus:outline-none z-50">
                    <Dialog.Title className="text-xl font-bold mb-4 text-white">
                        Editar Perfil
                    </Dialog.Title>

                    <div className="flex flex-col gap-4">
                        {/* Campo Usuário */}
                        <div className="flex flex-col gap-1">
                            <label className="text-gray-300 text-sm">Usuário</label>
                            <input
                                type="text"
                                maxLength={20}
                                value={pfTemp.usuario}
                                onChange={(e) =>
                                    setPfTemp((prev: any) => ({ ...prev, usuario: e.target.value }))
                                }
                                className="w-full bg-[#202024] border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Seu nome de usuário"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-gray-300 text-sm">Bio</label>
                            <textarea
                                rows={5}
                                maxLength={250}
                                value={pfTemp.texto_bio}
                                onChange={(e) =>
                                    setPfTemp((prev: any) => ({
                                        ...prev,
                                        texto_bio: e.target.value,
                                    }))
                                }
                                className="w-full bg-[#202024] border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                                placeholder="Escreva algo sobre você..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6 gap-2">
                        <Dialog.Close className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 text-white">
                            Cancelar
                        </Dialog.Close>
                        <button
                            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 text-white"
                            onClick={() => setConfirmModal(true)}
                        >
                            Confirmar
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
