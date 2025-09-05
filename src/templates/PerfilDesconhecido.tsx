export default function PerfilNaoEncontrado() {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-[#242428] text-white rounded-2xl shadow-lg shadow-cyan-500/30 p-8 max-w-md w-full text-center border border-cyan-500/20 z-20">
                <h1 className="text-2xl font-bold mb-4 drop-shadow-[0_0_10px_rgba(0,255,255,0.6)]">
                    Perfil não encontrado
                </h1>
                <p className="text-gray-300 mb-6">
                    O usuário que você tentou acessar não existe ou foi removido.
                </p>
            </div>
        </div>
    );

}
