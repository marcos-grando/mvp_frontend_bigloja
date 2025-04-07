import axios from "axios";

const apiProdutos = axios.create({
    baseURL: "http://localhost:5001",
});

// ===[ Produtos ]==========================================

// C - Adciona novos produtos (POST)
export const adicionarProduto = async (formData) => {
    try {
        if (!formData) return null;

        const resposta = await apiProdutos.post("/produtos", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return resposta.data;
    } catch (erro) {
        console.error("Erro ao adicionar produto:", erro);
        return null;
    }
};

// R - Mostra todos produtos (GET)
export const listarProdutos = async () => {
    try {
        const resposta = await apiProdutos.get("/produtos");
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao listar produtos:", erro);
        return null;
    }
};

// U - Atualizar info do produto (PUT)
export const atualizarProduto = async (id, campo, valor) => {
    try {
        const formData = new FormData();
        campo === "imagem"
            ? formData.append("imagem", valor)
            : formData.append(campo, valor);

        const resposta = await apiProdutos.put(`/produtos/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return resposta.data;
    } catch (erro) {
        console.error("Erro ao atualizar produto:", erro);
        return null;
    }
};

// D - Remover produto (DELETE)
export const removerProduto = async (id) => {
    try {
        const resposta = await apiProdutos.delete(`/produtos/${id}`);
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao remover produto:", erro);
        return null;
    }
};

export default apiProdutos;
