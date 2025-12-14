import Cookies from "js-cookie";
import api from "../../services/api";

export async function deleteFrequencie(FrequecieIds: string[]) {

    try{
        console.log(FrequecieIds);
        //Pega o token do usuário
        const token = Cookies.get('token');
        
        //Realiza a requisição para a API
        await api.delete('/frequency', 
            {
                params:{
                    id: FrequecieIds
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
                    console.log("Verfique se o registro de frequencia realmente existe Erro: ", error);
                    return "Registro de frequencia não encontrado.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao excluir frequência. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao excluir frequência. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao excluir frequência. Tente novamente!";
    }
    
}