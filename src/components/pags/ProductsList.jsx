import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductsListFilter from "./ProductListFilter";

function ProductsList({ addCart }) {
    const [produtos, setProdutos] = useState([]);
    const [filtros, setFiltros] = useState([]);
    const [order, setOrder] = useState("asc");

    const [isWidthMob, setIsWidthMob] = useState(false);
    const [isFilterFixed, setIsFilterFixed] = useState(false);

    useEffect(() => {
        const updateWidth = () => {
            const width = window.innerWidth;
            
            if (width <= 1375) {
                setIsWidthMob(true);
            } else {
                setIsWidthMob(false);
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);


    // produtos , filtros , order
    const produtosFiltrados = produtos
        .filter((produto) => filtros.length === 0 || filtros.includes(produto.categoria.toLowerCase()))
        .sort((a, b) => order === "asc" ? a.valor - b.valor : b.valor - a.valor);

    return (
        <section className="wrapper">
            <h2>Produtos Disponíveis</h2>
            <div className="container">

                {isWidthMob && <i className="fas fa-bars" onClick={() => setIsFilterFixed(true)}></i>}
                {isFilterFixed && <div className="filtros fixed">
                    <div className="filtros-content">
                        <i className="fas fa-times" onClick={() => setIsFilterFixed(false)}></i>
                        <ProductsListFilter filtros={filtros} order={order} setFiltros={setFiltros} setOrder={setOrder} setProdutos={setProdutos} />
                    </div>
                </div>}

                {!isWidthMob && <div className="filtros">
                    <ProductsListFilter filtros={filtros} order={order} setFiltros={setFiltros} setOrder={setOrder} setProdutos={setProdutos} />
                </div>}

                <div className="content">
                    {produtosFiltrados.map((produto) => (
                        <ProductCard key={produto.id} produto={produto} addCart={addCart} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductsList;
