import api from "../services/api";

export async function getFrequencieRequired(rank: string){
    try{
        
        const token = localStorage.getItem('token');
        if(rank.includes('/')){
            rank = rank.replace('/', '_')
        }

        //Requisição
        const response = await api.get(`/config/rank/${rank}`, 
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(response.data.config);
        return response.data.config;
    }   
    catch(error: any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Aluno não encontrado. Erro: ", error);
                    return "Aluno não encontrado.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao graduar aluno. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao graduar aluno. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao graduar aluno. Tente novamente!";
    }
}