import axios from "axios";

const apiCompras = axios.create({
    baseURL: "http://localhost:5003",
});

// ===[ Compras ]==========================================

// Registrar Pedido
export const registrarPedido = async (nome, cep, produtos) => {
    try {
        const resposta = await apiCompras.post("/compras", {
            comprador_nome: nome,
            comprador_cep: cep,
            produtos,
        });
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao registrar pedido:", erro);
        return null;
    }
};

// Retorna a lista de pedidos após validação (USER)
export const listarCompras = async (nome, cep) => {
    try {
        await atualizarStatusEntregas();
        const resposta = await apiCompras.get(
            `/compras?nome=${encodeURIComponent(nome)}&cep=${cep}`
        );
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao obter pedidos:", erro);
        return [];
    }
};
export const validarComprador = async (nome, cep = "") => {
    try {
        const url = cep
            ? `/compras/validar?nome=${encodeURIComponent(nome)}&cep=${cep}`
            : `/compras/validar?nome=${encodeURIComponent(nome)}`;
        const resposta = await apiCompras.get(url);
        return resposta.data;
    } catch {
        return { nome: false, cep: false };
    }
};

// Retorna a lista completa de compras (ADM)
export const listarComprasAdm = async () => {
    try {
        await atualizarStatusEntregas();
        const resposta = await apiCompras.get("/compras/adm");
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao listar compras (ADM):", erro);
        return [];
    }
};

// Ao listar compras chama a api para atualizar o status de entrega no banco de dados
const atualizarStatusEntregas = async () => {
    try {
        await apiCompras.patch("/compras/atualizar-status");
    } catch (erro) {
        console.error("Erro ao atualizar status de entregas:", erro);
    }
};

// Cancelar Compra
export const cancelarCompra = async (id) => {
    try {
        const resposta = await apiCompras.delete(`/compras/${id}`);
        return resposta.data;
    } catch (erro) {
        console.error("Erro ao cancelar compra:", erro);
        return null;
    }
};

export default apiCompras;
