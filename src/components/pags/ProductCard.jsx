import React, { useState } from "react";

function ProductCard({ produto, addCart }) {

    const [mensagem, setMensagem] = useState("");
    const [loading, setLoading] = useState(null);

    const handleCompra = async (produto) => {
        setLoading(produto.id);
        setMensagem("");

        try {
            const sucesso = await addCart({ ...produto, produto_id: produto.id });
            setMensagem(sucesso ? 'Produto adicionado ao carrinho!' : 'Erro ao adicionar novo produto.');
        } catch (erro) {
            console.error("Erro ao adicionar ao carrinho:", erro);
            setMensagem("Erro ao processar produto.");
        }

        setLoading(null);
        setTimeout(() => {
            setMensagem("");
        }, 2000);
    };

    return (
        <div className="item">

            <img src={produto.imagem} alt={produto.nome} />
            <div className="text">
                <h3>{produto.nome}</h3>
                <p>
                    {/* Preço:{" "} */}
                    {Number(produto.valor).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </p>
            </div>
            <button onClick={() => handleCompra(produto)} disabled={loading === produto.id || produto.estoque === 0}
                style={{ backgroundColor: produto.estoque === 0 ? 'grey' : '', pointerEvents: produto.estoque === 0 ? 'none' : '' }}
            >
                {produto.estoque === 0 ?
                    <p>Produto Indisponível</p> :
                    loading === produto.id
                        ? (<p>Processando</p>)
                        : (<p><i className="fa-solid fa-cart-plus"></i>Adicionar ao carrinho</p>)
                }
            </button>
            <p style={{ color: "#02160cad", fontSize: "0.85rem" }}>{produto.estoque === 0 ? 'Reposição em breve' : `${produto.estoque} unidades`}</p>
            {mensagem && <p className="mensagem">{mensagem}</p>}

        </div>
    );
};

export default ProductCard;