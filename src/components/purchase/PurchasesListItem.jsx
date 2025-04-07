import React, { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PurchasesListItem({ pedido }) {

    const [copyID, setCopyID] = useState('');

    const [msgProduto, setMsgProduto] = useState('');
    const [msgCompra, setMsgCompra] = useState('');

    const formatDate = (date) => {
        const [ano, mes, dia] = date.split("-");
        const data = new Date(+ano, mes - 1, +dia);
        return data.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    useEffect(() => {
        const finalizado = !!pedido.data_status_final;

        if (finalizado) {
            if (pedido.itens.some(item => item.status === 4)) {
                setMsgProduto("Compra entregue com sucesso!");
                setMsgCompra(`Entregue em ${formatDate(pedido.data_status_final)}`);
            } else if (pedido.itens.some(item => item.status === 5)) {
                setMsgProduto("A compra foi cancelada!");
                setMsgCompra(`Compra cancelada em ${formatDate(pedido.data_status_final)}`);
            }
        } else {
            setMsgProduto("Produto logo chegará em suas mãos!");
            setMsgCompra(`Previsão de entrega ${formatDate(pedido.previsao_entrega)}`);
        }

    }, [pedido]);

    const mapearStatus = (codigo) => {
        const status = ["Em preparação", "Enviado", "À caminho", "Chega amanhã", "Entregue", "Cancelado"];
        return status[codigo] || "Desconhecido";
    };
    const coresStatus = (codigo) => {
        switch (codigo) {
            case 0: return "#b48b0e";
            case 1: return "#0e64b4";
            case 2: return "#0284c7";
            case 3: return "#0e7a32";
            case 4: return "#0e7a32";
            case 5: return "#bd1818";
            default: return "#200";
        };
    };

    const totalValorPedido = pedido.itens.reduce((soma, item) => soma + item.valor, 0);

    const copyText = (text) => {
        navigator.clipboard.writeText(text).then(() => setCopyID("Código copiado")).catch(err => setCopyID("Erro ao copiar"));
        setTimeout(() => setCopyID(""), 1500);
    };

    return (
        <div className="minhasCompras-item">
            <div className="item-title">
                <div className="item-date">
                    <p>Pedido realizado</p>
                    <p>{pedido.data}</p>
                </div>
                <div className="item-valor">
                    <p>Valor total</p>
                    <p>{totalValorPedido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
                <div className="item-cep">
                    <p>Enviado para</p>
                    <p>CEP {pedido.comprador_cep}</p>
                </div>
                <div className="item-id">
                    <p>Pedido ID</p>
                    <div>
                        <p>{pedido.pedido_id}</p>
                        <i onClick={() => copyText(pedido.pedido_id)} className="far fa-copy"></i>
                    </div>
                    {copyID && <p className="copyAlert">{copyID}</p>}
                </div>
            </div>

            <ul>
                <li style={{ fontSize: "0.95rem", opacity: "0.9"}}>{msgCompra}</li>
                {pedido.itens.map((item, index) => (
                    <li key={index}>
                        <div className="img"><img src={item.imagem} alt="" /></div>
                        <div className="infos">
                            <p className="status" style={{ color: coresStatus(item.status) }}>{mapearStatus(item.status)}</p>

                            <p className="entrega">{msgProduto}</p>

                            <p className="nome">{item.nome}</p>
                            <p className="qntd">{`${item.quantidade} ${item.quantidade === 1 ? 'unidade' : 'unidades'}`}</p>
                            <p className="valor">Preço: {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                        </div>
                        <div className="vend-por">
                            <p>Vendido por:</p>
                            <Link to={"/"}>
                                Big Loja
                            </Link>
                        </div>
                    </li>
                ))}
                <li className="end" style={{ fontSize: "0.95rem", opacity: "0.9"}}>Comprador: {pedido.comprador_nome}</li>
            </ul>
            <h3></h3>
        </div>
    );
};

export default PurchasesListItem;