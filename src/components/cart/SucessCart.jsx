import React from "react";
import { Link } from "react-router-dom";

function SucessCart() {

    return (
        <>
            <h2>Compra finalizada</h2>
            <div className="sucess-cart">
                <div className="sucess-content">
                    <i className="far fa-check-circle"></i>
                    <p>Compra feita com sucesso!</p>
                    <p>Em breve seu pedido estará em suas mãos.</p>

                    <Link to={"/"}>
                        <button className="irHome">Voltar para a loja!</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SucessCart;