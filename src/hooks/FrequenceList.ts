import api from "../services/api";

export async function pegarfrequencias(classID?:string, studentID?:string, date?:string) {

    try{
        //Filtra apenas os parametros que não são undefined
        const params: any = {};

        if (classID) params.classID = classID;
        if (studentID) params.studentID = studentID;
        if (date) params.date =  date;

        //Pega o token do usuário
        const token = localStorage.getItem('token')

        if(!token){
            return "Token não encontrado. Faça login novamente.";
        }

        const response = await api.get('/frequency', 
            {
                params,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )

        console.log('Frequências pegas com sucesso.')
        return response.data;

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