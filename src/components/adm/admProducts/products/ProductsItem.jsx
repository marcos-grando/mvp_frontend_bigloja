import React from "react";

function ProductsItem({ isWarning, showDetalhes, produto, detalhes, clickRemoveItem }) {

    return (
        <div className="produto-item"
            onClick={!isWarning ? () => showDetalhes(produto.id) : undefined} title={produto.nome}
        >
            <p className="id">{produto.id}</p>
            <p className="nome">{produto.nome}</p>
            <p className="valor">{produto.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
            <p className="estoque">{produto.estoque}</p>
            <i className="fa-solid fa-trash" title="Excluir produto"
                onClick={() => clickRemoveItem(produto.id)}
            ></i>

            {detalhes.includes(produto.id)
                ? <i className="fa-solid fa-caret-down"></i>
                : <i className="fa-solid fa-caret-right"></i>
            }
        </div>
    );
};

export default ProductsItem;