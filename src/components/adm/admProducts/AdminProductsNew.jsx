import React, { useRef, useState } from "react";

function AdminProductsNew({ refreshList, showNewProduto, adicionarProduto, categoria }) {
   
    const [novoProduto, setNovoProduto] = useState({
        nome: "",
        valor: "",
        estoque: "",
        categoria: categoria.nome,
        imagem: null
    });

    const [erro, setErro] = useState({});
    const [erroClass, setErroClass] = useState("");

    const [imagemPreview, setImagemPreview] = useState("/imgneut.webp");
    const inputRef = useRef(null);

    const handleImagemChange = (event) => {
        const arquivo = event.target.files[0];
        if (arquivo) {
            const urlImagem = URL.createObjectURL(arquivo);
            setImagemPreview(urlImagem);
            setNovoProduto((prev) => ({ ...prev, imagem: arquivo }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoProduto((prev) => ({ ...prev, [name]: value }));
    };

    const handleDivClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const validaCampo = () => {
        setErroClass("show")

        let novosErros = {};
        if (!novoProduto.nome) novosErros.nome = true;
        if (!novoProduto.valor) novosErros.valor = true;
        if (!novoProduto.estoque) novosErros.estoque = true;

        setErro(novosErros);

        setTimeout(() => {
            setErroClass("out");
        }, 1000);
        setTimeout(() => {
            setErro({});
        }, 1500);
        return Object.keys(novosErros).length === 0;
    };

    const handleSubmit = async () => {
        if (!validaCampo()) return;

        const formData = new FormData();
        formData.append("nome", novoProduto.nome);
        formData.append("valor", novoProduto.valor);
        formData.append("estoque", novoProduto.estoque ?? 100);
        formData.append("categoria", novoProduto.categoria);

        if (novoProduto.imagem) {
            formData.append("imagem", novoProduto.imagem);
        } else {
            const resposta = await fetch("/imgNull.jpg");
            const blob = await resposta.blob();
            const file = new File([blob], "imgNull.jpg", { type: "image/jpeg" });

            formData.append("imagem", file);
        }

        try {
            const resposta = await adicionarProduto(formData);
            if (resposta) {
                await refreshList(categoria.id);
                // showNewProduto(categoria.id);
            }
        } catch (erro) {
            console.error("Erro ao registrar produto:", erro);
        }
    };
    

    return (
        <li className="novo-produto">
            <div className="form-nome">
                <p>Produto:</p>
                <div className="content">
                    <input type="text" name="nome" value={novoProduto.nome} onChange={handleInputChange} />
                    {erro.nome && <p className={`erro ${erroClass}`}>*Campo obrigatório</p>}
                </div>
            </div>
            <div className="form-valor">
                <p>Preço Un.:</p>
                <div className="content">
                    <input type="number" name="valor" value={novoProduto.valor} onChange={handleInputChange} />
                    {erro.valor && <p className={`erro ${erroClass}`}>*Campo obrigatório</p>}
                </div>
            </div>
            <div className="form-estoque">
                <p>Estoque:</p>
                <div className="content">
                    <input type="number" name="estoque" value={novoProduto.estoque} onChange={handleInputChange} />
                    {erro.estoque && <p className={`erro ${erroClass}`}>*Campo obrigatório</p>}
                </div>
            </div>
            <div className="form-categoria">
                <p>Categoria:</p>
                <div className="content">
                    <select name="categoria" value={novoProduto.categoria} onChange={handleInputChange}>
                        <option value={categoria.nome}>{categoria.nome}</option>
                    </select>
                </div>
            </div>

            <div className="form-imagem">
                <p>Upload de imagem:</p>
                <div className="content">
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputRef}
                        onChange={handleImagemChange}
                        style={{ display: "block" }}
                    />
                </div>
            </div>
            <div className="form-img" onClick={handleDivClick}>
                <div className="img">
                    <img src={imagemPreview} alt="Foto do produto" />
                </div>
                <i className="fas fa-camera"></i>
            </div>

            <button className="cancelar" onClick={() => showNewProduto(categoria.id)}>Cancelar registro!</button>
            <button className="registrar" onClick={handleSubmit}>Registrar produto!</button>
        </li>
    );
};

export default AdminProductsNew;