import React, { useEffect, useState } from "react";

function CartBuyingItems({ produto, toggleSelect, updateQuantity, removeItem }) {

    const [msg, setMsg] = useState("");

    useEffect(() => {
        const changeMsg = () => {
            const width = window.innerWidth;
            
            if (width <= 650) {
                setMsg("Remover produto");
            } else {
                setMsg("Remover do carrinho");
            }
        };

        changeMsg();
        window.addEventListener("resize", changeMsg);
        return () => window.removeEventListener("resize", changeMsg);
    }, []);

    return (
        <li>
            <input
                type="checkbox"
                checked={produto.selecionado}
                onChange={() => toggleSelect(produto.id)}
            />
            <img src={produto.imagem} alt="Imagem do produto" />
            <div className="content">
                <div className="title-valor">
                    <h3>{produto.nome}</h3>
                    <p className="valorTotal">
                        {Number(produto.valor * produto.quantidade).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </p>
                </div>
                <p className="valorUn">
                    Preço:{" "}
                    {Number(produto.valor).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </p>
                <p className="frete">Frete Grátis</p>
                <div className="interat">
                    <div className="n-itens">
                        <button
                            className="qntd"
                            onClick={() => updateQuantity(produto.id, produto.quantidade - 1)}
                            disabled={produto.quantidade <= 0}
                        >
                            <i className="fas fa-minus"></i>
                        </button>
                        <input
                            type="number"
                            value={produto.quantidade || 0}
                            onChange={(e) => updateQuantity(produto.id, e.target.value)}
                            min="0"
                            max={produto.estoque}
                        />
                        <button
                            className="qntd"
                            onClick={() => updateQuantity(produto.id, produto.quantidade + 1)}
                            disabled={produto.quantidade >= produto.estoque}
                        >
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <button className="remover-produtoCart" onClick={() => removeItem(produto.id)}>{msg}</button>
                </div>
            </div>
        </li>
    );
};

export default CartBuyingItems;