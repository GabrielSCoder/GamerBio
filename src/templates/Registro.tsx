import Loading from "../components/Loading";

type props = {
    setOpt: any, setUsuario: any, setSenha: any, login: any, erroMsg: any, loading: any, usuario: any, senha: string, erroMsgRegistro: any, setSenhaConfirmacao: any, dataNascimento: any,
    senhaConfirmacao: any, setDataNascimento: any
}

export default function RegistroTemplate(props: props) {

    const { erroMsg, loading, login, senha, setSenha, setUsuario, usuario, erroMsgRegistro, dataNascimento, senhaConfirmacao, setSenhaConfirmacao, setDataNascimento, setOpt } = props
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4 w-[320px] p-6 items-center justify-center 
      bg-[#18181c] text-white rounded-2xl shadow-lg shadow-cyan-500/10 border border-cyan-500/20 h-full">
                {loading ? (
                    <>
                        <div className="h-[550px] flex justify-center items-center">
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
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                        {erroMsgRegistro.usuario && (
                            <span className="text-red-500 text-xs italic self-start -mt-2">
                                {erroMsgRegistro.usuario}
                            </span>
                        )}

                        <label htmlFor="senha" className="text-sm text-gray-300 self-start">
                            Senha
                        </label>
                        <input
                            id="senha"
                            type="password"
                            name="senha"
                            className="w-full px-3 py-2 rounded-lg bg-[#242428] border border-gray-600 
          focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        {erroMsgRegistro.senha && (
                            <span className="text-red-500 text-xs italic self-start -mt-2">
                                {erroMsgRegistro.senha}
                            </span>
                        )}

                        <label htmlFor="senha_confirmacao" className="text-sm text-gray-300 self-start">
                            Repetir Senha
                        </label>
                        <input
                            id="senha_confirmacao"
                            type="password"
                            name="senha_confirmacao"
                            className="w-full px-3 py-2 rounded-lg bg-[#242428] border border-gray-600 
          focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"
                            value={senhaConfirmacao}
                            onChange={(e) => setSenhaConfirmacao(e.target.value)}
                        />

                        <label htmlFor="nascimento" className="text-sm text-gray-300 self-start">
                            Data de nascimento
                        </label>
                        <input
                            id="nascimento"
                            type="date"
                            name="nascimento"
                            className="w-full px-3 py-2 rounded-lg bg-[#242428] border border-gray-600 
          focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                        />
                        {erroMsgRegistro.data_nascimento && (
                            <span className="text-red-500 text-xs italic self-start -mt-2">
                                {erroMsgRegistro.data_nascimento}
                            </span>
                        )}

                        <button
                            className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 
          hover:opacity-90 transition font-semibold tracking-wide shadow-md shadow-cyan-500/20 hover:cursor-pointer"
                            onClick={() => login()}
                        >
                            Registrar
                        </button>

                        {erroMsg && <span className="text-red-500 text-xs italic">{erroMsg}</span>}

                        <hr className="w-full border-gray-700 my-4" />

                        <a
                            className="hover:cursor-pointer text-sm text-cyan-400 hover:underline"
                            onClick={() => setOpt(0)}
                        >
                            Já possui uma conta? Realizar login
                        </a>
                    </>
                )}
            </div>
        </div>

    )
}