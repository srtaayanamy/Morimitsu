import api from "../services/api";

export async function editaTurma(id: string, dados: any) {
    try {
        if (!dados || Object.keys(dados).length === 0) {
            return "Nenhum dado para atualizar.";
        }

        // Filtra campos vazios
        const dadosFiltrados = Object.fromEntries(
            Object.entries(dados).filter(([_, value]) => 
                value !== null && value !== undefined
            )
        );
        console.log(dadosFiltrados)
        const response = await api.put(`/class/${id}`, dadosFiltrados);

        console.log('Retorno da requisição:', response.data);
        console.log('Status:', response.status);

        // 200 ou 201 são sucessos para PUT!
        if ( response.status === 201) {
            console.log('Turma atualizada com sucesso!');
            return true;
        } else {
            return "Erro inesperado ao atualizar a turma.";
        }

    } catch (error: any) {
        console.error("Erro completo:", error);

        if (error.response) {
            const status = error.response.status;
            if (status === 404) return "Turma não encontrada.";
            if (status === 500) return "Erro interno no servidor.";
            return error.response.data?.message || "Erro ao atualizar a turma.";
        }

        if (error.request) {
            return "Sem resposta do servidor. Verifique sua conexão.";
        }

        return "Erro inesperado.";
    }
}
