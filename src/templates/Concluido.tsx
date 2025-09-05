export default function Concluido(props: { setOpt: any }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4 w-[320px] p-6 items-center justify-center 
                bg-[#18181c] text-white rounded-2xl shadow-lg shadow-cyan-500/10 border border-cyan-500/20 h-[500px]">
                <p className="text-center text-lg font-semibold">
                    Seu cadastro foi concluído!
                </p>
                <a
                    className="hover:cursor-pointer text-sm text-cyan-400 hover:underline"
                    onClick={() => props.setOpt(0)}
                >
                    Realizar login
                </a>
            </div>
        </div>
    )
}