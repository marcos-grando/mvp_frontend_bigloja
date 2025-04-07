import React, { useEffect, useState } from "react";

function CheckBuyingCheck({ total, buyName, setBuyName, buyCEP, setBuyCEP, setCheck }) {

    const [checkName, setCheckName] = useState(false);
    const [checkCep, setCheckCep] = useState(false);
    
    useEffect(() => {
        checkName && checkCep
            ? setCheck(true)
            : setCheck(false);
    }, [checkName, checkCep]);

    return (
        <div className="checkBuy">
            <div className="check-container">
                <div className="checkName">
                    <p>Nome completo <span>*</span></p>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Digite seu nome..."
                        value={buyName}
                        onChange={(e) => {
                            let valor = e.target.value;
                            valor.length > 0
                                ? setCheckName(true)
                                : setCheckName(false);
                            setBuyName(valor);
                        }}
                        title="Digite seu nome completo"
                        required
                    />
                </div>
                <div className="checkCep">
                    <p>CEP <span>*</span></p>
                    <input
                        type="text"
                        placeholder="Exemplo: 00001-002"
                        pattern="\d{5}-\d{3}"
                        maxLength={9}
                        value={buyCEP}
                        onChange={(e) => {
                            let valor = e.target.value.replace(/\D/g, "").slice(0, 8);
                            if (valor.length > 5) {
                                valor = valor.slice(0, 5) + "-" + valor.slice(5);
                              }
                            setBuyCEP(valor);
                            valor.length === 9
                                ? setCheckCep(true)
                                : setCheckCep(false);
                        }}
                        title="Digite o CEP do seu endereço"
                        required
                    />
                </div>
            </div>
            <h3 className="totalCompra">
                Valor total:{" "}
                <span>
                    {Number(total).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </span>
            </h3>
        </div>
    );
};

export default CheckBuyingCheck;