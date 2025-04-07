import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listarProdutos } from "../../api_produtos";

function ProductsListFilter({ filtros, order, setFiltros, setOrder, setProdutos }) {
    const [categorias, setCategorias] = useState([]);
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoriaSelecionada = queryParams.get("categoria");
    
    useEffect(() => {
        const fetchProdutos = async () => {
            const params = new URLSearchParams();
            if (categoriaSelecionada) params.append("categorias", categoriaSelecionada);
            params.append("preco", order);

            const produtosData = await listarProdutos(params.toString());

            if (produtosData) {
                setProdutos(produtosData);
                setCategorias([...new Set(produtosData.map((produto) => produto.categoria.toLowerCase()))]);
            }
        };

        fetchProdutos();
    }, [categoriaSelecionada, order]);

    const toggleCategoria = (categoria) => {
        setFiltros((prevFiltros) =>
            prevFiltros.includes(categoria)
                ? prevFiltros.filter((filtro) => filtro !== categoria)
                : [...prevFiltros, categoria]
        );
    };

    return (
        <>
            <div className="filtro-categorias">
                <h3>Categorias</h3>
                {categorias.map((categoria) => (
                    <label key={categoria}>
                        <input
                            type="checkbox"
                            checked={filtros.includes(categoria)}
                            onChange={() => toggleCategoria(categoria)}
                        />
                        {categoria}
                    </label>
                ))}
            </div>
            <div className="filtro-order">
                <h3>Ordenar por Preço</h3>
                <select value={order} onChange={(e) => setOrder(e.target.value)}>
                    <option value="asc">Menor preço</option>
                    <option value="desc">Maior preço</option>
                </select>
            </div>
        </>
    );
};

export default ProductsListFilter;