import api from "../services/api";

export async function pegaDadosUser() {
    try{

        const token = localStorage.getItem('token');

        const response= await api.get('/user/profile', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });

        if(response.status===200){
            console.log('Usuário encontrado.');
            console.log(response.data.body)
            return response.data.body;
        }

    } catch(error: any){

        if(error.response){
            switch(error.response.status){
                case 404:
                    console.log('Usuário não encontrado.');
                    return 'Usuário não encontrado.';
                case 500:
                    console.log('Erro interno no servidor.');
                    return 'Não foi possível acessar os dados. Tente novamente.';
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao carregar os dados do usuário. Tente novamente!";
            }
        }

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Servidor não respondeu. Verifique sua conexão.";
        }

        //Qualquer outro tipo de erro
        console.error("Erro inesperado:", error.message);
        return "Erro inesperado ao carregar os dados do usuário.";
    }
}