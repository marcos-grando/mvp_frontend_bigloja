import axios from "axios";

const apiCategorias = axios.create({
    baseURL: "http://localhost:5002",
});

// ===[ Categorias ]========================================

// C - Criar uma nova categoria 
export const criarCategoria = async (nome) => {
    try {
        const resposta = await apiCategorias.post("/categorias", { nome });
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao criar categoria:", erro);
        return null;
    }
};

// R - Retorna as categorias existentes
export const listarCategorias = async () => {
    try {
        const resposta = await apiCategorias.get("/categorias");
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao listar categorias:", erro);
        return [];
    }
};

// U - Alterações nos dados da categoria
export const atualizarCategoria = async (id, nome) => {
    try {
        const resposta = await apiCategorias.put(`/categorias/${id}`, { nome });
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao atualizar categoria:", erro);
        return null;
    }
};

// D - Excluir uma categoria existente
export const removerCategoria = async (id) => {
    try {
        const resposta = await apiCategorias.delete(`/categorias/${id}`);
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao remover categoria:", erro);
        return null;
    }
};

export default apiCategorias;
