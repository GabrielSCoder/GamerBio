import { useEffect, useState } from "react";
import { logadoAsync, loginAsync, logoutAsync } from "../services/auth";
import { criarSuperUsuario } from "../services/usuario";
import { useLocation, useNavigate } from "react-router";

export default function useData() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [erroMsg, setErroMsg] = useState<any>(null);
    const [erroMsgRegistro, setErroMsgRegistro] = useState<{
        usuario: string | null,
        senha: string | null,
        data_nascimento: string | null
    }>({
        usuario: null,
        senha: null,
        data_nascimento: null
    })

    const [logado, setLogado] = useState(false)
    const [loading, setLoading] = useState(false);
    const [registroConc, setRegistroConc] = useState(false)
    const [LogadoProfileData, setLogadoProfileData] = useState<any>(null)
    const nav = useNavigate()

    const limparDados = () => {
        setUsuario("")
        setSenha("")
    }

    const login = async () => {

        setLoading(true)

        const next = async () => {
            const data = {
                usuario: usuario,
                senha: senha
            }

            try {
                const resp = await loginAsync(data);
                const token = resp.data.dados.token
                localStorage.setItem('profile', token)
                nav("/profile/" + data.usuario)
            } catch (error: any) {
                const msg = error.response.data.error
                setErroMsg(msg)
                setLoading(false)
            }
        }

        setTimeout(next, 2000)
    }

    const registrar = async () => {

        setLoading(true)

        const next = async () => {

            if (senha != senhaConfirmacao) {
                setErroMsg("Senhas não conferem")
                setLoading(false)
            } else {
                const data = {
                    usuario: usuario,
                    senha: senha,
                    data_nascimento: dataNascimento
                }

                try {
                    await criarSuperUsuario(data);
                    setRegistroConc(true);
                    setErroMsg(null)
                    setUsuario("")
                    setSenha("")
                    setDataNascimento("")
                    setSenhaConfirmacao("")
                } catch (error: any) {
                    const msg = error.response.data.error as string
                    const parts = msg.split(",")

                    const erros: {
                        usuario: string | null;
                        senha: string | null;
                        data_nascimento: string | null;
                    } = {
                        usuario: null,
                        senha: null,
                        data_nascimento: null,
                    };

                    parts.forEach((parte) => {
                        if (parte.toLowerCase().includes("usuário")) {
                            erros.usuario = parte.trim();
                        } else if (parte.toLowerCase().includes("senha")) {
                            erros.senha = parte.trim();
                        } else if (parte.toLowerCase().includes("nascimento")) {
                            erros.data_nascimento = parte.trim();
                        }
                    });

                    setErroMsgRegistro(erros);
                } finally {
                    setLoading(false)
                }
            }
        }

        setTimeout(next, 2000)
    }

    const isLogged = async () => {

        setLoading(true)
        try {
            const resp = await logadoAsync()
            setLogadoProfileData(resp.data.user)
            setLogado(resp.data.success)
        } catch (error) {
            setLogado(false)
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            await logoutAsync();
        } catch (error) {
            console.log(error)
        } finally {
            localStorage.removeItem("profile");
            setLogado(false);
            setLogadoProfileData(null);
            nav("/")
        }
    };

    useEffect(() => {
        isLogged()
    }, [])

    const location = useLocation();

    useEffect(() => {
        if (logado && LogadoProfileData?.usuario) {
            if (location.pathname === "/") {
                nav(`/profile/${LogadoProfileData.usuario}`);
            }
        }
    }, [logado, LogadoProfileData, location.pathname, nav]);


    return {
        login,
        limparDados,
        setUsuario,
        setSenha,
        setDataNascimento,
        setLoading,
        registrar,
        setSenhaConfirmacao,
        setLogadoProfileData,
        logout,
        senhaConfirmacao,
        dataNascimento,
        loading,
        usuario,
        senha,
        erroMsg,
        erroMsgRegistro,
        registroConc,
        logado,
        LogadoProfileData
    }
}