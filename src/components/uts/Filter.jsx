import { useState, useEffect } from "react";

function Filter({ categorias, aplicarFiltro }) {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState([]);
    const [ordenacao, setOrdenacao] = useState("");

    useEffect(() => {
        const params = new URLSearchParams();
        if (categoriaSelecionada.length > 0) {
            params.append("categorias", categoriaSelecionada.join(","));
        }
        if (ordenacao) {
            params.append("preco", ordenacao);
        }

        aplicarFiltro(`/produtos?${params.toString()}`);
    }, [categoriaSelecionada, ordenacao]);

    const toggleCategoria = (categoria) => {
        setCategoriaSelecionada((prev) =>
            prev.includes(categoria)
                ? prev.filter((c) => c !== categoria)
                : [...prev, categoria]
        );
    };

    return (
        <div className="filter">
            <h3>Filtrar por:</h3>

            <div className="filter-section">
                <h4>Categorias</h4>
                {categorias.map((categoria) => (
                    <label key={categoria}>
                        <input
                            type="checkbox"
                            value={categoria}
                            checked={categoriaSelecionada.includes(categoria)}
                            onChange={() => toggleCategoria(categoria)}
                        />
                        {categoria}
                    </label>
                ))}
            </div>

            <div className="filter-section">
                <h4>Ordenar por preço</h4>
                <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="asc">Menor Preço</option>
                    <option value="desc">Maior Preço</option>
                </select>
            </div>
        </div>
    );
}

export default Filter;