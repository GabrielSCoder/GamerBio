import Loading from "../components/Loading"

export default function LoginTemplate(props: { setOpt: any, setUsuario: any, setSenha: any, login: any, erroMsg: any, loading: any, usuario: any, senha: string }) {

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4 w-[320px] p-6 items-center justify-center 
                bg-[#18181c] text-white rounded-2xl shadow-lg shadow-cyan-500/10 border border-cyan-500/20 h-full">
                {props.loading ? (
                    <>
                        <div className="h-[390px] flex justify-center items-center">
                            <Loading />
                        </div>
                    </>
                ) : (
                    <>
                        <label htmlFor="usuario" className="text-sm text-gray-300 self-start">
                            Usuário
                        </label>
                        <input
                            id="usuario"
                            type="text"
                            name="usuario"
                            className="w-full px-3 py-2 rounded-lg bg-[#242428] border border-gray-600 
                            focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                            value={props.usuario}
                            onChange={
                                (e) => {
                                    props.setUsuario(e.target.value)
                                    // localStorage.setItem("usuario", e.target.value)
                                }
                            }
                        />

                        <label htmlFor="senha" className="text-sm text-gray-300 self-start">
                            Senha
                        </label>
                        <input
                            id="senha"
                            type="password"
                            name="senha"
                            className="w-full px-3 py-2 rounded-lg bg-[#242428] border border-gray-600 
               focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"
                            value={props.senha}
                            onChange={(e) => props.setSenha(e.target.value)}
                        />

                        <div className="flex items-center gap-2">
                            <input id="lembrar" type="checkbox" className="px-3 py-2 rounded-lg bg-[#242428] border border-gray-600 
               focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"/>
                            <label htmlFor="lembrar" className="text-sm text-gray-300">
                                Lembrar de mim
                            </label>
                        </div>

                        <button
                            className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 
               hover:opacity-90 transition font-semibold tracking-wide shadow-md shadow-cyan-500/20 hover:cursor-pointer" onClick={() => props.login()}
                        >
                            Entrar
                        </button>
                        {props.erroMsg && <h4 className="text-red-500">{props.erroMsg}</h4>}
                        <hr className="w-full border-gray-700 my-4" />
                        <a className="hover:cursor-pointer text-sm text-cyan-400 hover:underline" onClick={() => props.setOpt(1)}>
                            Não possui uma conta? Criar agora
                        </a>
                    </>
                )}
            </div>
        </div>
    )
}