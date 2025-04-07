import { useEffect, useState } from "react";
import { listarProdutos } from "../../api_produtos";
import HomeSlide from "./HomeSlide";

function Home({ addCart }) {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        const carregarProdutos = async () => {
            const dados = await listarProdutos();
            if (dados) setProdutos(dados);
        };
        carregarProdutos();
    }, []);

    const renderCategoria = produtos.reduce((acc, produto) => {
        const nome = produto.categoria;
        if (!acc[nome]) {
            acc[nome] = {
                categoria_id: produto.categoria_id,
                nome,
                produtos: [],
            };
        }
        acc[nome].produtos.push(produto);
        return acc;
    }, {});

    const categoriaDescordem = Object.values(renderCategoria)
        .filter(c => c.produtos.length >= 4)
        .sort((a, b) => b.categoria_id - a.categoria_id);

    return (
        <section className="home">
            {categoriaDescordem.map((categoria, index) => (
                <HomeSlide
                    key={index}
                    addCart={addCart}
                    title={categoria.nome}
                    produtos={categoria.produtos}
                />
            ))}
        </section>
    );
}

export default Home;
