import * as Dialog from "@radix-ui/react-dialog";

export default function UrlModal(props: {
    modal: boolean;
    setModal: (val: boolean) => void;
    links: any;
    setLinks: any;
    setConfirmModal: (val: boolean) => void;
}) {

    const platforms = [
        { name: "Steam", prefix: "https://steamcommunity.com/profiles/", key: "steam" },
        // { name: "PSN", prefix: "https://psnprofiles.com/", key: "psn" },
        { name: "Xbox Live", prefix: "https://www.xbox.com/pt-BR/play/user/", key: "live" },
        // { name: "Nintendo", prefix: "https://www.nintendo.com/profile/", key: "nintendo" },
        { name: "Twitch", prefix: "https://www.twitch.tv/", key: "twitch" },
        { name: "Retro Achievements", prefix: "https://retroachievements.org/user/", key: "retro" },
    ];

    const handleChange = (platform: string, value: string) => {
        props.setLinks((prev: any) => ({ ...prev, [platform]: value }));
    };

    return (
        <Dialog.Root open={props.modal} onOpenChange={props.setModal}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 w-[600px] -translate-x-1/2 -translate-y-1/2 bg-[#242428] rounded-xl shadow-lg p-6 focus:outline-none z-50">
                    <Dialog.Title className="text-xl font-bold mb-4 text-white">Adicionar links</Dialog.Title>

                    <div className="flex flex-col gap-3">
                        {platforms.map(p => (
                            <div key={p.key} className="flex items-center gap-2">
                                <span className="text-gray-400 whitespace-nowrap">{p.prefix}</span>
                                <input
                                    type="text"
                                    value={props.links[p.key as keyof typeof props.links]}
                                    onChange={e => handleChange(p.key, e.target.value)}
                                    className="flex-1 bg-[#202024] border border-gray-700 rounded-lg p-2 text-white focus:outline-none"
                                    placeholder="Seu usuário"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-6 gap-2">
                        <Dialog.Close className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700">
                            Cancelar
                        </Dialog.Close>
                        <button
                            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
                            onClick={() => props.setConfirmModal(true)}
                        >
                            Confirmar
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
