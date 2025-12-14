import Cookies from "js-cookie";
import api from "../../services/api";

export async function getReportsAndExports() {
    try{
        
        //Pega o token do usuário
        const token = Cookies.get('token');

        //Requisição
        const response = await api.get(`/dashboard`, 
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(response.data.response)
        
        console.log('Dados retornados com sucesso.');
        return response.data.response;

    } catch(error: any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){ 
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao pegar os dados. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao pegar os dados. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao pegar os dados. Tente novamente!";
       
    }
}