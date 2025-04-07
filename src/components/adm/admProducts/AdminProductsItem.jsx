import React, { useState } from "react";
import ProductsWarning from "./products/ProductsWarning";
import ProductsItem from "./products/ProductsItem";
import ProductsItemForm from "./products/ProductsItemForm";

function AdminProductsItem({ produto, categorias, removeProduto, updateProduto, setRefresh }) {

    // editando: Permite alterar cada informação individualmente;
    // isWarning: Ativa o modal de "atenção"/confirmação para excluir um produto;

    // detalhes: Administra a exibição do ""formulário"" de alteração de infos:
    // o id do produto é armazenado, e se 'id está incluso no array' ProductsItemForm é renderizado;

    const [editando, setEditando] = useState({ campo: null, valor: "" });
    const [detalhes, setDetalhes] = useState([]);
    const [previewImg, setPreviewImg] = useState(produto.imagem);
    console.log(produto.imagem);

    const [isWarning, setIsWarning] = useState(false);

    const showDetalhes = (produtoId) => {
        setDetalhes((prev) => {
            if (prev.includes(produtoId)) {
                cancelarEdicao();
                return prev.filter((id) => id !== produtoId);
            }
            return [...prev, produtoId];
        });
    };

    // As três funções abaixo atuam na alteração individual das infos do produto;
    const iniciarEdicao = (campo, valor) => {
        setEditando({ campo, valor });
    };
    const cancelarEdicao = () => {
        setEditando({ campo: null, valor: "" });
        setPreviewImg(produto.imagem);
    };
    const salvarEdicao = async (campo) => {
        const novoValor = editando.valor;
        await updateProduto(produto.id, campo, novoValor);
        setEditando({ campo: null, valor: "" });
        setRefresh(prev => !prev);
    };


    // Ativa o modal para exclusão de produto;
    const clickRemoveItem = (produtoId) => {
        setIsWarning(true);
        showDetalhes(produtoId);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImg(event.target.result);
            };
            reader.readAsDataURL(file);
            setEditando({ campo: "imagem", valor: file });
        } else {
            setPreviewImg("/imgneut.webp");
            setEditando({ campo: "imagem", valor: null })
        }
    };

    return (
        <li className={detalhes.includes(produto.id) ? 'li-editando' : ''}
        >
            {isWarning && <ProductsWarning setIsWarning={setIsWarning} produto_nome={produto.nome} produto_id={produto.id} removeProduto={removeProduto} />}

            <ProductsItem
                isWarning={isWarning}
                showDetalhes={showDetalhes}
                produto={produto}
                detalhes={detalhes}
                clickRemoveItem={clickRemoveItem}
            />

            {detalhes.includes(produto.id) &&
                <ProductsItemForm
                    produto={produto}
                    categorias={categorias}
                    previewImg={previewImg}
                    editando={editando}
                    handleFileChange={handleFileChange}
                    setEditando={setEditando}
                    iniciarEdicao={iniciarEdicao}
                    salvarEdicao={salvarEdicao}
                    cancelarEdicao={cancelarEdicao}
                />
            }
        </li>
    );
}

export default AdminProductsItem;
