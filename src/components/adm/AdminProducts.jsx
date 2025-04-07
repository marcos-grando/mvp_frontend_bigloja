import { useEffect, useState } from "react";
import { criarCategoria, listarCategorias, atualizarCategoria, removerCategoria } from "../../api_categorias";
import { removerProduto } from "../../api_produtos";
import AdminProductsList from "./admProducts/AdminProductsList";

function AdminProducts() {

    const [categorias, setCategorias] = useState([]);
    const [refreshCateg, setRefreshCateg] = useState(null);

    const [isNewCateg, setIsNewCateg] = useState(false);
    const [newCategoria, setNewCategoria] = useState("");
    const [categEdit, setCategEdit] = useState(null);
    const [newName, setNewName] = useState("");
    const [categNameUpdate, setCategNameUpdate] = useState(null);

    const [isWarning, setIsWarning] = useState(null);
    const [openWarning, setOpenWarning] = useState(null);
    const [isWarningContent, setIsWarningContent] = useState([]);

    // Retorna a lsita de categorias (para o estado categorias)
    useEffect(() => {
        const fetchCategorias = async () => {
            const dados = await listarCategorias();
            if (dados) {
                setCategorias(dados.sort((a, b) => a.id - b.id));
            }
        };
        fetchCategorias();
    }, []);

    const isClick = () => {
        isNewCateg ? setIsNewCateg(false) : setIsNewCateg(true);
    };
    const isClickEdit = (categId, categNome) => {
        setNewName(categNome);
        setCategEdit(categId);
    };
    const isClickRemove = (categId) => {
        setIsWarning(categId);
        setTimeout(() => {
            setOpenWarning(categId);
        }, 250);
    }
    // Cria uma nova categoria
    const createCategoria = async () => {
        setIsWarning(null);
        setOpenWarning(null);

        if (!newCategoria.trim()) return;

        const resposta = await criarCategoria(newCategoria);
        if (resposta && resposta.id) {
            setCategorias((prev) => [...prev, { id: resposta.id, nome: newCategoria }].sort((a, b) => a.id - b.id));
            setNewCategoria("");
        }
    };
    // Atualiza o nome da categoria
    const updateCategoria = async (id) => {
        const resposta = await atualizarCategoria(id, newName);
        if (resposta && resposta.mensagem) {
            setCategorias((prev) => prev.map((cat) => cat.id === id ? { ...cat, nome: newName } : cat));
            setCategEdit(null);
            setCategNameUpdate(id);
            setTimeout(() => {
                setCategNameUpdate(null);
            }, 200);
        }
    };

    const contentToWarning = (produtos) => {
        setIsWarningContent(produtos);
    };
    // Remove uma categoria + produtos
    const removeCategoria = async (id, produtos) => {
        
        for (const produto of produtos) {
            await removerProduto(produto.id);
        }

        const resposta = await removerCategoria(id);
        if (resposta && resposta.mensagem) {
            setCategorias((prev) => prev.filter((cat) => cat.id !== id));
        }

        setIsWarningContent([]);
        setIsWarning(null);
    };



    return (
        <div className="container-admin">
            <h3>Gerenciar Produtos</h3>
            {categorias.map((categoria, i) => (
                <div key={i} className="categoria-admin">
                    <ul>
                        <div className="categ-edit">
                            <div className={`title ${categEdit === categoria.id ? 'out' : 'show'}`}>
                                <h3>{categoria.nome}</h3>
                                <i className="fa-solid fa-pencil" onClick={() => isClickEdit(categoria.id, categoria.nome)}></i>
                                <i className="fa-solid fa-trash" onClick={() => isClickRemove(categoria.id)}></i>
                            </div >

                            <div className={`input-edit ${categEdit === categoria.id ? 'show' : 'out'}`}>
                                <input type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    disabled={categEdit !== categoria.id}
                                    autoFocus
                                />
                                <i className={`fa-solid fa-check`} onClick={() => updateCategoria(categoria.id)}></i>
                                <i className={`fa-solid fa-ban`} onClick={() => setCategEdit(null)} ></i>
                            </div>
                        </div>

                        <AdminProductsList
                            categorias={categorias}
                            categoria={categoria}
                            categNameUpdate={categNameUpdate}
                            contentToWarning={contentToWarning}
                            isWarning={isWarning}
                            refreshCateg={refreshCateg}
                            setRefreshCateg={setRefreshCateg}
                        />

                        <h4>{/* h4 fictício apenas para dar volume na borda inferior */}</h4>

                        {openWarning === categoria.id && <div className="warning-excluirCateg">
                            <div className="quest-excluirCateg">
                                <p>Você está excluindo</p>
                                <p>Categoria: <span>{categoria.nome}</span></p>
                                {isWarningContent.length > 0 &&
                                    <>
                                        <p>Em conjunto será excluído <span>{isWarningContent.length} produto(s)</span>:</p>
                                        <ul>
                                            {isWarningContent.map(p => (
                                                <li className="listt" key={p.id}>
                                                    <span>› {p.nome}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                }
                                <p>Tem certeza disso?</p>
                                <div className="buttons-excluirCateg">
                                    <button onClick={() => removeCategoria(categoria.id, isWarningContent)}>SIM, QUERO EXCLUIR!</button>
                                    <button onClick={() => { setOpenWarning(null); setIsWarning(null); }}>NÃO, quero voltar!</button>
                                </div>
                            </div>
                        </div>}
                    </ul >
                </div >
            ))}

            <div className={`nova-categoriaAdmin ${isNewCateg ? 'show' : 'out'}`} onClick={!isNewCateg ? isClick : undefined}>
                {!isNewCateg && <i className="fas fa-plus"></i>}
                <div className={`nova-categoriaContent`}>

                    <h4>Criando nova categoria de produtos...</h4>
                    <button className="cancelar-newCateg" onClick={isClick}>Cancelar</button>

                    <div className="input-novaCateg">
                        <div className="form-novaCateg">
                            <p>Nova categoria:</p>
                            <input
                                type="text"
                                value={newCategoria}
                                onChange={(e) => setNewCategoria(e.target.value)}
                                placeholder="Digite aqui..."
                            />
                        </div>
                        <button className="criar-newCateg" onClick={createCategoria}>Criar categoria</button>
                    </div>

                    <h4></h4>
                </div>

            </div>

        </div >
    );
}

export default AdminProducts;
