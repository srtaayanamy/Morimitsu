import Cookies from "js-cookie";
import api from "../../services/api";

export async function GraduationStudent(studentId: string) {
    
    try{
        //Pega o token do usuário
        const token = Cookies.get('token');
        console.log(token)

        //Requisição
        const response = await api.patch(`/student/promote/rank`, {},
            {
                params:{
                    studentId: studentId
                },
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );

        //Verifica se a requisição foi um sucesso
        console.log(response.data.data)
        console.log('Aluno graduado com sucesso.')
        return response.data.data;
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