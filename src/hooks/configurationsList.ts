import api from "../services/api";

export async function configGraduantionsList(){

    try{

        const token = localStorage.getItem('token');

        const response = await api.get('/config',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response.data.configs)



    }catch(error:any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Alguma das entidades não foi encontrada, forneça o token, o id da turma e o id do estudante corretamente e verifique sua existencia. Erro: ", error);
                    return "Algum dos filtros está inválido.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao listar as frequências. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao listar as frequências. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao listar as frequências. Tente novamente!";   
    }

}