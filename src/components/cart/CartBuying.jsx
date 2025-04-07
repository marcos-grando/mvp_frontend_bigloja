import React, { useEffect, useRef, useState } from "react";
import CartBuyingItems from "./CartBuyingItems";
import { registrarPedido } from "../../api_compras";
import CheckBuyingCheck from "./CartBuyingCheck";

function CartBuying({ cart, clearCart, toggleSelect, toggleSelectAll, selectAll, updateQuantity, removeItem, setSucess, total }) {

    const [buyName, setBuyName] = useState("");
    const [buyCEP, setBuyCEP] = useState("");
    const [check, setCheck] = useState(false);

    const [mensagem, setMensagem] = useState("");

    const finalizarCompra = async () => {
        const itensMarcados = cart.filter((produto) => produto.selecionado);

        if (itensMarcados.length === 0) {
            setMensagem("Nenhum item selecionado para compra.");
            return;
        }
        for (const produto of itensMarcados) {
            if (produto.quantidade > produto.estoque) {
                setMensagem(`Estoque insuficiente para ${produto.nome}.`);
                return;
            }
        }
        setMensagem("Processando compra...");

        const name = buyName;
        const cep = buyCEP;
        const produtos = itensMarcados.map((produto) => ({
            produto_id: produto.id,
            nome: produto.nome,
            valor: produto.valor,
            quantidade: produto.quantidade,
        }));

        try {
            const resposta = await registrarPedido(name, cep, produtos);
            console.log("✅ Resposta da API:", resposta);

            setTimeout(() => {
                setMensagem("Compra finalizada com sucesso!");
            }, 1000);
            setTimeout(() => {
                setSucess(true);
                clearCart();
            }, 2000);
        } catch (erro) {
            console.error("❌ Erro ao finalizar a compra:", erro);
            setMensagem("Erro ao finalizar a compra.");
        }

        setTimeout(() => setMensagem(""), 2000);
    };

    return (
        <ul>
            <li className="li-title">
                <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                />
                <div className="content">
                    <p>Produto</p>
                    <p>Preço</p>
                </div>
            </li>
            {cart.map((produto, index) => (
                <CartBuyingItems // <li> aqui tbm
                    key={index}
                    produto={produto}
                    toggleSelect={toggleSelect}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                />
            ))}
            {mensagem && <p className="mensagemStatus">{mensagem}</p>}

            <div className="finalizando">
                <CheckBuyingCheck total={total} buyName={buyName} setBuyName={setBuyName} buyCEP={buyCEP} setBuyCEP={setBuyCEP} setCheck={setCheck} />
                <button className="finalizarCompra"
                    onClick={check ? finalizarCompra : () => { }}
                    style={!check ? { filter: 'brightness(0.9)', pointerEvents: 'none' } : {}}
                >
                    Finalizar Compra
                </button>
            </div>
        </ul>
    );
};

export default CartBuying;