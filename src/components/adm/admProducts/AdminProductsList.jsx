import { useEffect, useState } from "react";
import AdminProductsItem from "./AdminProductsItem";
import AdminProductsNew from "./AdminProductsNew";
import { adicionarProduto, listarProdutos, atualizarProduto, removerProduto } from "../../../api_produtos";

function AdminProductsList({ categorias, categoria, categNameUpdate, contentToWarning, isWarning, refreshCateg, setRefreshCateg }) {

    const [produtos, setProdutos] = useState([]);
    const [newProduto, setNewProduto] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchProdutos = async () => {
            const dados = await listarProdutos();
            if (dados) setProdutos(dados);
        };
        fetchProdutos();
    }, [refresh, categNameUpdate, refreshCateg]);

    useEffect(() => {
        const fetchWarningContent = async () => {
            if (!isWarning || categoria.id !== isWarning) return;
    
            const dados = await listarProdutos();
            const warningFiltered = dados.filter(p => p.categoria_id === isWarning);
            contentToWarning && contentToWarning(warningFiltered);
        };
        fetchWarningContent();
    }, [isWarning]);
    
    const showNewProduto = (categoriaId) => {
        setNewProduto((prev) =>
            prev.includes(categoriaId)
                ? prev.filter((id) => id !== categoriaId)
                : [...prev, categoriaId]
        );
    };

    // Recarrega a div da categoria (para o novo produto aparecer)
    const refreshList = async (categoriaId) => {
        setRefresh(prev => !prev);
        showNewProduto(categoriaId);
    };

    // Atualiza infos individuais do produto (id produto, campo 'tipo info', valor id categoria ou novo nome, etc)
    const updateProduto = async (id, campo, valor) => {
        const resposta = await atualizarProduto(id, campo, valor);
        if (resposta) {
            setProdutos((prev) =>
                prev.map((p) =>
                    p.id === id
                        ? {
                            ...p,
                            [campo]: campo === "imagem" ? resposta.imagem || p.imagem : valor
                        }
                        : p
                )
            );
            if (campo === "categoria") {
                setRefreshCateg(Number(valor));
            }
        }
    };
    // Remove produto pela lixeira
    const removeProduto = async (id) => {
        const resposta = await removerProduto(id);
        if (resposta) {
            setProdutos((prev) => prev.filter((p) => p.id !== id));
        }
    };

    return (
        <>

            <div className="infos">
                <p className="id">#</p>
                <p className="nome">Nome do produto</p>
                <p className="valor">Preço Un.</p>
                <p className="estoque">Qntd</p>
            </div>

            {produtos.filter((produto) => produto.categoria === categoria.nome)
                .map((produto) => (
                    <AdminProductsItem key={produto.id}
                        produto={produto}
                        categorias={categorias}
                        removeProduto={removeProduto}
                        updateProduto={updateProduto}
                        setRefresh={setRefresh}
                    />
                ))
            }

            {!newProduto.includes(categoria.id) &&
                < div className="click-new" onClick={() => showNewProduto(categoria.id)}>
                    <p className="id"><i className="fa-solid fa-plus"></i></p>
                    <p className="nome">Adicionar novo produto</p>
                    <p className="valor">--------</p>
                    <p className="estoque">---</p>
                </div>
            }

            {newProduto.includes(categoria.id) &&
                < div className="click-new" onClick={() => showNewProduto(categoria.id)}>
                    <p className="id"><i className="fa-solid fa-minus"></i></p>
                    <p className="nome">Registrando novo produto...</p>
                </div>
            }
            {newProduto.includes(categoria.id) &&
                <AdminProductsNew
                    refreshList={refreshList}
                    showNewProduto={showNewProduto}
                    adicionarProduto={adicionarProduto}
                    categoria={categoria}
                />
            }
        </>
    );
};

export default AdminProductsList;