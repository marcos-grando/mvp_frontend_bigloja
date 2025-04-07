import React from "react";

function ProductsWarning({ setIsWarning, produto_nome, produto_id, removeProduto }) {

    return (
        <div className="warning-excluir" style={{ pointerEvents: "none" }}>
            <div className="quest-excluir">
                <p>Você está excluindo</p>
                <p>{produto_nome}</p>
                <p>Tem certeza disso?</p>
                <button onClick={() => removeProduto(produto_id)}>SIM, QUERO EXCLUIR!</button>
                <button onClick={() => setIsWarning(false)}>NÃO, quero voltar!</button>
            </div>
        </div>
    );
};

export default ProductsWarning;