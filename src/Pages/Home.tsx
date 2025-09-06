import { useState } from "react";
import LoginTemplate from "../templates/Login";
import RegistroTemplate from "../templates/Registro";
import useData from "../hooks/useData";
import Concluido from "../templates/Concluido";

export default function HomePage() {
    const [opt, setOpt] = useState(0);
    const { setSenha, login, erroMsg, loading, usuario, senha, setUsuario, registroConc, registrar, setSenhaConfirmacao, senhaConfirmacao, dataNascimento, setDataNascimento, erroMsgRegistro } = useData()

    return (
        <>
            <div className="lg:hidden flex overflow-y-hidden">
                <h5 className="text-3xl text-center font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
                    Versão indisponível para mobile
                </h5>
            </div>
            <div className="lg:flex hidden flex-col items-center justify-center gap-6 text-center overflow-hidden">
                <div>
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
                        GamerBio
                    </h2>
                    <p className="text-gray-400 text-base">
                        Crie um perfil gamer com a sua cara!
                    </p>
                </div>

                <div className="group [perspective:1000px] w-[500px] min-h-[500px] flex items-center justify-center">
                    {opt == 0 && (
                        <LoginTemplate
                            setOpt={setOpt}
                            setUsuario={setUsuario}
                            setSenha={setSenha}
                            login={login}
                            erroMsg={erroMsg}
                            loading={loading}
                            usuario={usuario}
                            senha={senha}
                        />
                    )}
                    {opt == 1 && !registroConc && <RegistroTemplate setOpt={setOpt}
                        setUsuario={setUsuario}
                        setSenha={setSenha}
                        login={registrar}
                        erroMsg={erroMsg}
                        loading={loading}
                        usuario={usuario}
                        senha={senha} erroMsgRegistro={erroMsgRegistro} setSenhaConfirmacao={setSenhaConfirmacao} dataNascimento={dataNascimento} senhaConfirmacao={senhaConfirmacao} setDataNascimento={setDataNascimento} />}
                    {opt == 1 && registroConc && <Concluido setOpt={setOpt} />}
                </div>
                <div className="fixed bottom-1">
                    <a href="https://github.com/GabrielSCoder/GamerBio" target="_blank" className="text-gray-600">Repositório</a>
                    <p>Desenvolvido por Gabriel Sena. 2025</p>
                </div>
            </div>
        </>

    )
}