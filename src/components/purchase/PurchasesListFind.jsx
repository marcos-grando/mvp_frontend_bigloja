import React, { useState } from "react";
import { listarCompras, validarComprador } from "../../api_compras";

function PurchasesListFind({ setPedidos, setMensagem, setIsFind }) {

    const [nome, setNome] = useState("");
    const [cep, setCep] = useState("");
    const [nomeValido, setNomeValido] = useState(null);
    const [cepValido, setCepValido] = useState(null);

    // setNome, setCep, setNomeValido, setCepValido / validarComprador
    const validarNome = async (valor) => {
        setNome(valor);
        setCep("");
        setNomeValido(null);
        setCepValido(null);

        if (valor.trim().length >= 2) {
            const resultado = await validarComprador(valor);
            setNomeValido(resultado.nome);
        }
    };
    // setCep, setCepValido / validarComprador
    const validarCEP = async (valor) => {
        let v = valor.replace(/\D/g, "");
        if (v.length > 8) v = v.slice(0, 8);
        if (v.length > 5) v = v.slice(0, 5) + "-" + v.slice(5);
        setCep(v);

        if (/^\d{5}-\d{3}$/.test(v)) {
            const resultado = await validarComprador(nome, v);
            setCepValido(resultado.cep);
        } else {
            setCepValido(null);
        }
    };
    // setMensagem, setPedidos / listarCompras
    const buscarCompras = async () => {
        setMensagem("");
        const resultado = await listarCompras(nome, cep);
        if (resultado.length === 0) {
            setMensagem("Nenhum pedido encontrado.");
            setPedidos([]);
        } else {
            setIsFind(true);
            setPedidos(resultado);
        }
    };

    const renderIcone = (valido) => {
        return (
            <div className="iconI">
                {
                    valido
                        ? <i className="fa-solid fa-check"></i>
                        : <i className="fa-solid fa-xmark"></i>
                }
            </div>);
    };

    return (
        <div className="pesquisar-comprador">
            <div className="inputName">
                <label>
                    <p>Nome completo<span>*</span></p>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => validarNome(e.target.value)}
                        placeholder="Digite seu nome"
                        required
                    />
                    {nome.length <= 1 ? null : renderIcone(nomeValido)}
                </label>
            </div>
            <div className="inputCep">
                <label>
                    <p>Informe seu CEP<span>*</span></p>
                    <input
                        type="text"
                        value={cep}
                        onChange={(e) => validarCEP(e.target.value)}
                        placeholder="00001-002"
                        required
                        disabled={!nomeValido}
                    />
                    {cep.length < 9 ? null : renderIcone(cepValido)}
                </label>
            </div>
            <button className="irCompras"
                onClick={buscarCompras}
                disabled={!nomeValido || !cepValido}
            >
                Ver Pedidos
            </button>
        </div>
    );
};

export default PurchasesListFind;