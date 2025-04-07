import React from "react";
import { Link } from "react-router-dom";

function VoidCart() {

    return (
        <div className="wrapper-cartVazio">
            <div className="cart-vazio">
                <div className="icon-cartVazio">
                    <i className="fas fa-shopping-cart"></i>
                    <i className="fas fa-times"></i>
                </div>
                <div className="text-cartVazio">
                    <p>Seu carrinho de compras está vazio</p>
                    <p>Navegue pela Big Loja e veja nossos produtos.</p>
                </div>
                <Link to={"/"}>
                    <button className="irHome">Ir às compras!</button>
                </Link>
            </div>
        </div>
    );
};

export default VoidCart;