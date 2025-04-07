import React from "react";

function AdminPurchasesItem({ pedido, mapearStatus, cancelarCompra }) {

    const total = pedido.itens.reduce((soma, item) => soma + item.valor, 0);

    return (
        <div className="admin-pedido">
            <div className="infos-pedido">
                <p><strong>Data:</strong> {pedido.data}</p>
                <p><strong>Total:</strong> {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p><strong>ID:</strong> {pedido.pedido_id}</p>
            </div>
            <ul className="itens">
                {pedido.itens.map((item, idx) => (
                    <li key={idx} className="item">
                        <img src={item.imagem} alt={item.nome} />
                        <div>
                            <p><strong>{item.nome}</strong></p>
                            <p className="qntd">{`${item.quantidade} ${item.quantidade === 1 ? 'unidade' : 'unidades'}`}</p>
                            <p className="valor">{item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            <p>Status: {mapearStatus(item.status)}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="infos-comprador">
                <p><strong>Comprador:</strong> {pedido.comprador_nome}</p>
                <p><strong>CEP:</strong> {pedido.comprador_cep}</p>
                {!pedido.itens.some(item => item.status === 4 || item.status === 5) && (
                    <button onClick={() => cancelarCompra(pedido.pedido_id)}>Cancelar Pedido</button>
                )}
                {pedido.itens.some(item => item.status === 4 || item.status === 5) && (
                    <button style={{ background: "linear-gradient(135deg, #cc7722, #e58e26)" }} onClick={() => cancelarCompra(pedido.pedido_id)}>Excluir registro</button>
                )}
            </div>
        </div>
    );
};

export default AdminPurchasesItem;