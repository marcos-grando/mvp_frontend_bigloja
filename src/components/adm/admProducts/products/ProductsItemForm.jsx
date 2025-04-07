import React from "react";

function ProductsItemForm({ produto, categorias, previewImg, editando, handleFileChange, setEditando, iniciarEdicao, salvarEdicao, cancelarEdicao }) {

    const campos = [
        { campo: "nome", title: "Produto", type: "text", class: "form-nome" },
        { campo: "valor", title: "Preço Un.", type: "number", class: "form-valor" },
        { campo: "estoque", title: "Estoque", type: "number", class: "form-estoque" },
        { campo: "categoria", title: "Categoria", type: "select", options: categorias, class: "form-categoria" }
    ];

    const iconEdits = (campo, campoEdit) => {
        return (
            <>
                <div className="i-edit">
                    <i className="fa-solid fa-pencil"
                        onClick={() => iniciarEdicao(campo, produto[campo])}
                        style={{
                            opacity: campoEdit ? 0.5 : 1,
                            pointerEvents: campoEdit ? "none" : "auto",
                        }}
                    ></i>
                </div >
                <i className={`fa-solid fa-check ${campoEdit === campo ? 'editando' : ''}`}
                    onClick={() => salvarEdicao(campo)}
                ></i>
                <i className={`fa-solid fa-ban ${campoEdit === campo ? 'editando' : ''}`}
                    onClick={cancelarEdicao}
                ></i>
            </>
        )
    };

    return (
        <div className="produto-form">

            {campos.map((campo) => (
                <div key={campo.campo} className={campo.class}>
                    <p>{campo.title}:</p>
                    <div className={`content ${editando.campo ? 'select-input' : ''}`}>
                        {campo.type === "select"
                            ? (
                                <select
                                    value={editando.campo === campo.campo ? editando.valor : produto[campo.campo]}
                                    onChange={(e) => setEditando({ campo: campo.campo, valor: e.target.value })}
                                    disabled={editando.campo !== campo.campo}
                                >
                                    <option value="">{produto.categoria}</option>
                                    {campo.options.filter(option => option.id !== produto.categoria_id).map((option, i) => (
                                        <option key={i} value={option.id}>{option.nome}</option>
                                    ))}
                                </select>
                            )
                            : (
                                <input type={campo.type}
                                    value={editando.campo === campo.campo ? editando.valor : produto[campo.campo]}
                                    onChange={(e) => setEditando({ campo: campo.campo, valor: e.target.value })}
                                    disabled={editando.campo !== campo.campo}
                                />
                            )
                        }
                        {iconEdits(campo.campo, editando.campo)}
                    </div>
                </div>
            ))}
            <div className="form-imagem">
                <p>Alterar foto:</p>
                <div className="content">
                    <input
                        id={`input-img-${produto.id}`}
                        type="file"
                        accept="image/*"
                        style={{ display: "block" }}
                        onChange={handleFileChange}
                        onClick={() => iniciarEdicao("imagem", produto["imagem"])}
                    />
                    {iconEdits("imagem", editando.campo)}
                </div>
            </div>
            <div className="form-img">
                <div className="img" onClick={() => document.getElementById(`input-img-${produto.id}`).click()}>
                    <img src={previewImg || "/imgneut.webp"} alt={produto.nome} />
                </div>
                <i className="fas fa-camera"></i>
            </div>
        </div>
    );
};

export default ProductsItemForm;