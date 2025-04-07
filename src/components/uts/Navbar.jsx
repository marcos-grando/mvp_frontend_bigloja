import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ cart }) {

    const location = useLocation();
    const isAdminPage = location.pathname === "/admin";

    return (
        <header>
            <div className={isAdminPage ? "header-admin" : "container"}>
                <Link to="/" className="logo">
                    <i className="fas fa-store"></i> Big Loja
                </Link>

                {!isAdminPage &&
                    <nav>
                        <ul>
                            <li><Link to="/">Início</Link></li>
                            <li><Link to="/produtos">Todos os Produtos</Link></li>
                            <li><Link to="/compras">Minhas Compras</Link></li>
                        </ul>
                    </nav>
                }

                {!isAdminPage &&
                    <Link to="/carrinho" className="cart-icon">
                        <i className="fa-solid fa-cart-shopping"></i>
                        {cart.length > 0 && <span>{cart.length}</span>}
                    </Link>
                }
            </div>
        </header>
    );
}

export default Navbar;
