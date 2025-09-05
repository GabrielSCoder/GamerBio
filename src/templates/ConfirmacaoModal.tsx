import * as AlertDialog from "@radix-ui/react-alert-dialog";

type Props = {
    titulo: string;
    mensagem: string;
    modal: boolean;
    setModal: (value: boolean) => void;
    onConfirm: any;
};

export default function ConfirmModal({ titulo, mensagem, modal, setModal, onConfirm }: Props) {
    return (
        <AlertDialog.Root open={modal} onOpenChange={setModal}>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-[#242428] rounded-xl p-6 shadow-lg shadow-black/50 z-50">

                    <div className="flex justify-between items-center mb-4">
                        <AlertDialog.Title className="text-xl font-bold text-white">
                            {titulo}
                        </AlertDialog.Title>
                    </div>

                    <AlertDialog.Description className="text-gray-300 mb-6">
                        {mensagem}
                    </AlertDialog.Description>

                    <div className="flex justify-end gap-3">
                        <AlertDialog.Cancel
                            onClick={() => setModal(false)}
                            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors"
                        >
                            Cancelar
                        </AlertDialog.Cancel>

                        <AlertDialog.Action
                            onClick={onConfirm}
                            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
                        >
                            Confirmar
                        </AlertDialog.Action>
                    </div>

                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}

