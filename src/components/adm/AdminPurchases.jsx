import { useEffect, useState } from "react";
import { cancelarCompra as cancelarCompraAPI } from "../../api_compras";
import AdminPurchasesItem from "./AdminPurchasesItem";

function AdminPurchases({ compras, setCompras }) {

    const cancelarCompra = async (id) => {
        const resposta = await cancelarCompraAPI(id);
        
        if (resposta?.mensagem?.includes("removida da visão do administrador")) {
            setCompras((prev) => prev.filter((pedido) => pedido.pedido_id !== id));
        } else {
            setCompras((prev) =>
                prev.map((pedido) =>
                    pedido.pedido_id === id
                        ? {
                            ...pedido,
                            itens: pedido.itens.map((item) => ({
                                ...item,
                                status: 5
                            }))
                        }
                        : pedido
                )
            );
        }
    };

    console.log(compras);

    const mapearStatus = (codigo) => {
        const status = ["Em preparação", "Enviado", "À caminho", "Chega amanhã", "Entregue", "Cancelado"];
        return status[codigo] || "Desconhecido";
    };

    return (
        <div className="admin-compras">
            <h3>Gerenciar Pedidos</h3>

            {compras.length === 0 && <p>Nenhum pedido registrado.</p>}

            {compras.map((pedido) => (
                <AdminPurchasesItem key={pedido.pedido_id} pedido={pedido} mapearStatus={mapearStatus} cancelarCompra={cancelarCompra} />
            ))}
        </div>
    );
}

export default AdminPurchases;
