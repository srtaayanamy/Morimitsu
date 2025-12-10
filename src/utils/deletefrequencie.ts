import api from "../services/api";

export async function fazerFrequencia(FrequeciesIds: string[]) {

    try{
        const token = localStorage.getItem('token');

        await api.delete('/frequency', 
            {
                params:{
                    
                },
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log('Frequencia cadastrada com sucesso');
        return true;

    } catch(error: any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Alguma das entidades nao foi encontrada, forneça o token, o id da turma e o id do estudante corretamente e verifique sua existencia. Erro: ", error);
                    return "Algum dos alunos não foi encontradou.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao fazer frequência. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao fazer frequência. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao fazer frequência. Tente novamente!";        
    }
    
}