import api from "../../services/api";

export async function deleteClass(id:string) {
    try{
        // Faz requisição
        await api.delete(`/class/${id}`);
        
        console.log('Turma deletado com sucesso');
        return true;
        
    } catch(error: any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Turma não encontrado. Erro: ", error);
                    return "Turma não encontrado.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao deletar a turma. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao deletar a turma. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao deletar a turma. Tente novamente!";
        
    }
}