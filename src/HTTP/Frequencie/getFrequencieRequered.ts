import Cookies from "js-cookie";
import api from "../../services/api";

export async function getFrequencieRequired(rank: string){
    try{
        
        //Veifica se a faixa é coloria e se for formata para o aceitavel do backend
        if(rank.includes('/')){
            rank = rank.replace('/', '_')
        }

        //Pega o token do usuário
        const token = Cookies.get('token');

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
                    console.log("Configuração não encontrada para o rank informado. Erro: ", error);
                    return "Configuração não encontrada para o rank informado.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao buscar a frequencia do rank informado. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao buscar a frequencia do rank informado. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao buscar a frequencia do rank informado. Tente novamente!";
    }
}