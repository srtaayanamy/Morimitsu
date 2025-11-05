import api from "../services/api";

export async function deleteAluno(id:string) {
    
    try{
        const response= await api.delete(`/student/${id}`);

        if(response.status===200){
            console.log('Aluno deletado com sucesso');
            return true;
        }
        
    } catch(error: any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Aluno não encontrado. Erro: ", error);
                    return "Aluno não encontrado.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao deletar o aluno. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao deletar o aluno. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao deletar o aluno. Tente novamente!";
        
    }

}