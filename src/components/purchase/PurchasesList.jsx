import React, { useEffect, useState } from "react";
import PurchasesListFind from "./PurchasesListFind";
import PurchasesListItem from "./PurchasesListItem";

function PurchasesList() {
    const [pedidos, setPedidos] = useState([]);
    const [isFind, setIsFind] = useState(false);
    const [mensagem, setMensagem] = useState("");

    const returnToFind = () => {
        setIsFind(false);
        setTimeout(() => {
            setPedidos([]);
        }, 250);
    };

    const totalValor = pedidos.flatMap(pedido => pedido.itens).reduce((soma, item) => soma + item.valor, 0);

    return (
        <section className="minhas-compras">
            <h2>Minhas Compras</h2>

            <div className="minhasCompras-wrapper">

                <div className="minhasCompras-container">

                    {!isFind && <i className="fa-solid fa-shopping-basket"></i>}
                    {!isFind && <PurchasesListFind setPedidos={setPedidos} setMensagem={setMensagem} setIsFind={setIsFind} />}

                    {/* {isFind && <i className="fas fa-arrow-left" onClick={() => returnToFind()}></i>} */}
                    {isFind &&
                        <div className="titleInfos">
                            <i className="fas fa-arrow-left" onClick={() => returnToFind()}></i>
                            <p>{pedidos.length === 1 ? "1 pedido registrado" : `${pedidos.length} pedidos registrados`}</p>
                            <p>Valor total: {totalValor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                    }

                    {isFind && pedidos.map((pedido) => (
                        <PurchasesListItem
                            key={pedido.pedido_id}
                            pedido={pedido}
                        />
                    ))}

                </div>

                {mensagem && <p>{mensagem}</p>}
            </div>
        </section>
    );
}

export default PurchasesList;
