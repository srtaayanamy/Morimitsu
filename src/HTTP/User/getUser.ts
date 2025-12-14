import Cookies from "js-cookie";
import api from "../../services/api";

export async function getUser() {
    try{

        //Pega o token do usuário
        const token = Cookies.get('token');

        //Requisição
        const response= await api.get('/user/profile', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        
        console.log('Usuário encontrado.');
        console.log(response.data.body);
        return response.data.body;
    } catch(error: any){

        if(error.response){
            switch(error.response.status){
                case 404:
                    console.log('Usuário não encontrado.');
                    return 'Usuário não encontrado.';
                case 500:
                    console.log('Erro interno no servidor.');
                    return 'Erro ao buscar os dados do usuário. Tente novamente.';
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao buscar os dados do usuário. Tente novamente!";
            }
        }

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Servidor não respondeu. Verifique sua conexão.";
        }

        //Qualquer outro tipo de erro
        console.error("Erro inesperado:", error.message);
        return "Erro inesperado ao buscar os dados do usuário.";
    }
}