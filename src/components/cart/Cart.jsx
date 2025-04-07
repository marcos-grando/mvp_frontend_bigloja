import { useEffect, useState } from "react";
import VoidCart from "./VoidCart";
import CartBuying from "./CartBuying";
import SucessCart from "./SucessCart";

function Cart({ cart, setCart, clearCart, removeItem, updateQuantity, toggleSelect }) {

    const [sucess, setSucess] = useState(false);
    const [selectAll, setSelectAll] = useState(false);

    // Controle dos produtos selecionados no carrinho
    useEffect(() => {
        const todosMarcados = cart.length > 0 && cart.every((p) => p.selecionado);
        setSelectAll(todosMarcados);
    }, [cart]);
    // Seleciona todos produtos ao clicar no checkbox superior
    const toggleSelectAll = () => {
        const novoEstado = !selectAll;
        setSelectAll(novoEstado);
        const novoCart = cart.map((p) => ({
            ...p,
            selecionado: novoEstado,
            quantidade: novoEstado && p.quantidade === 0 ? 1 : p.quantidade
        }));
        setCart(novoCart);
    };

    // Faz a soma de preço dos itens selecionados retornando o valor total da compra
    const total = cart.filter((item) => item.selecionado).reduce((acc, item) => acc + item.valor * item.quantidade, 0);

    return (
        <section className="carrinho">
            <div className="wrapper">
                <div className="container">

                    {!sucess && <>
                        <h2>Carrinho de Compras</h2>

                        {cart.length === 0 && <VoidCart />}

                        {cart.length > 0 && <CartBuying
                            cart={cart}
                            clearCart={clearCart}
                            toggleSelect={toggleSelect}
                            toggleSelectAll={toggleSelectAll}
                            selectAll={selectAll}
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                            setSucess={setSucess}
                            total={total}
                        />}

                    </>}

                    {sucess && <SucessCart />}

                </div>
            </div>
        </section>
    );
};

export default Cart;
