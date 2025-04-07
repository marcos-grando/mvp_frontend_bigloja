import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/uts/Navbar";
import Home from "./components/pags/Home";
import ProductsList from "./components/pags/ProductsList";
import PurchasesList from "./components/purchase/PurchasesList.jsx";
import Cart from "./components/cart/Cart";
import Admin from "./components/adm/Admin.jsx";

function App() {

    const [cart, setCart] = useState([]);

    // -> Produtos <-
    // Adiciona produtos no carrinho
    const addCart = (produto) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                setCart((prevCart) => {
                    const itemExistente = prevCart.find((p) => p.id === produto.id);

                    if (itemExistente) {
                        if (itemExistente.quantidade >= produto.estoque) {
                            resolve(false);
                            return prevCart;
                        }
                        return prevCart.map((p) =>
                            p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
                        );
                    }

                    resolve(true);
                    return [...prevCart, { ...produto, quantidade: 1, selecionado: true, produto_id: produto.id }];
                });
            }, 1000);
        });
    };

    // --> Carrinho <--
    // Faz o aumento/redução dos itens no carrinho através dos buttons + / - ;
    const updateQuantity = (id, quantidade) => {
        setCart((prevCart) =>
            prevCart.map((p) => {
                if (p.id !== id) return p;

                let novaQuantidade = Number(quantidade);
                if (isNaN(novaQuantidade) || novaQuantidade < 0) novaQuantidade = 0;
                if (novaQuantidade > p.estoque) novaQuantidade = p.estoque;

                return {
                    ...p,
                    quantidade: novaQuantidade,
                    selecionado: novaQuantidade > 0,
                };
            })
        );
    };
    const toggleSelect = (id) => {
        setCart((prevCart) =>
            prevCart.map((p) => {
                if (p.id !== id) return p;

                const selecionando = !p.selecionado;

                return {
                    ...p,
                    selecionado: selecionando,
                    quantidade:
                        selecionando && p.quantidade === 0 ? 1 :
                            !selecionando ? 0 :
                                p.quantidade,
                };
            })
        );
    };
    const removeItem = (id) => {
        setCart((prevCart) => prevCart.filter((p) => p.id !== id));
    };
    const clearCart = () => {
        setCart([]);
    };

    // -> Minhas Compras <-
    const mapearStatus = (codigo) => {
        const status = ["Preparação", "Enviado", "A caminho", "Chega amanhã", "Entregue"];
        return status[codigo] || "Desconhecido";
    };

    return (
        <Router>
            <Navbar cart={cart} />
            <Routes>
                <Route path="/" element={<Home addCart={addCart} />} />
                <Route path="/produtos" element={<ProductsList addCart={addCart} />} />
                <Route path="/compras" element={<PurchasesList mapearStatus={mapearStatus} />} />
                <Route
                    path="/carrinho"
                    element={<Cart cart={cart} setCart={setCart} clearCart={clearCart} removeItem={removeItem} updateQuantity={updateQuantity} toggleSelect={toggleSelect} />}
                />
                <Route path="/admin" element={<Admin />} />
            </Routes>
            <p style={{ width: "100%", textAlign: "center", padding: "10px 0", margin: "10x 0", fontSize: "1.25rem", opacity: "0.7"}} >
                Desenvolvido por
                <a
                    href="https://github.com/marcos-grando"
                    title="github.com/marcos-grando"
                    target="_blank"
                    style={{ color: "#0c6753", marginLeft: "5px", opacity: "1" }}
                >
                    Marcos Grando
                </a>
            </p>
        </Router>
    );
}

export default App;
