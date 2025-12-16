import api from "../../services/api";

export async function editClass(classId: string, data: any) {
    try {
        if (!data || Object.keys(data).length === 0) {
            return "Nenhum dado para atualizar.";
        }
        

        // Filtra campos vazios
        const dataFiltred = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => 
                value !== null && value !== undefined
            )
        );

        //Faz a requisição
        await api.put(`/class/${classId}`, dataFiltred);
        
        console.log('Turma atualizada com sucesso!');
        return true;

    } catch (error: any) {
        if(error.response){
            switch(error.response.status){
                case 404:
                console.log("Turma não encontrada. Erro: ", error);
                return "Turma não encontrada";
                case 500:
                console.log("Erro interno no servidor. Erro:", error);
                return "Erro ao editar os dados da turma. Tente novamente!";
                default:
                console.log("Erro desconhecido da API:", error.response.status);
                return "Erro ao editar os dados da turma. Tente novamente!";
            }
        }

            //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Servidor não respondeu. Verifique sua conexão.";
        }

        //Qualquer outro tipo de erro
        console.error("Erro inesperado:", error.message);
        return "Erro ao editar os dados da turma.";

    }
}
