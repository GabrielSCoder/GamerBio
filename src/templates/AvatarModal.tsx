import * as Dialog from "@radix-ui/react-dialog";

export default function AvatarModal(props: {
    modal: boolean;
    setModal: (val: boolean) => void;
    pfTemp: { avatar_url: string };
    setPfTemp: (val: any) => void;
    setConfirmModal: (val: boolean) => void;
}) {
    const handleChange = (value: string) => {
        props.setPfTemp(prev => ({ ...prev, avatar_url: value }));
    };

    return (
        <Dialog.Root open={props.modal} onOpenChange={props.setModal}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-[#242428] rounded-xl shadow-lg p-6 focus:outline-none z-50">
                    <Dialog.Title className="text-xl font-bold mb-4 text-white">
                        Editar Imagem de Perfil
                    </Dialog.Title>

                    <Dialog.Description className="text-gray-300 mb-4">
                        Cole o link da sua nova imagem de perfil:
                    </Dialog.Description>

                    <input
                        type="text"
                        value={props.pfTemp.avatar_url ?? ""}
                        onChange={e => handleChange(e.target.value)}
                        placeholder="https://link-da-imagem.com/avatar.jpg"
                        className="w-full bg-[#202024] border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                    />

                    {props.pfTemp.avatar_url && (
                        <div className="flex justify-center mb-4">
                            <img
                                src={props.pfTemp.avatar_url ?? ""}
                                alt="Preview"
                                className="w-24 h-24 rounded-full object-cover border-2 border-purple-500"
                            />
                        </div>
                    )}

                    <div className="flex justify-end mt-4 gap-2">
                        <Dialog.Close className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 text-white">
                            Cancelar
                        </Dialog.Close>
                        <button
                            onClick={() => props.setConfirmModal(true)}
                            className="px-4"
                        >
                            Salvar Avatar
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
