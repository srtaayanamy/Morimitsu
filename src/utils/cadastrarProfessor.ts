import api from "../services/api";
import { pegaDadosAluno } from "./getDadosAluno";

export async function promoverAluno(senha:string, alunoId: string) {
    
    if(senha.length <= 8){
        return 'Senha deve ter 8 ou mais caracteres.'
    } else if(alunoId === undefined){
        return 'Id do aluno não informado.'
    }

    try{
        //Faz requisição dos dados do aluno
        const aluno = await pegaDadosAluno(alunoId);

        //Verifica se a requisição dos dados do aluno retornaram erro
        if(typeof aluno === 'string'){
            return aluno;
        };

        const token = localStorage.getItem('token');
        
        //Cria usuário do tipo professor
        const response = await api.patch('/student/promote',
            {
                password: senha
            },
            {
                params:{
                    studentId: alunoId
                },
                headers:{
                    Authorization: `Bearer ${token}`
                },
            }
        );

        if(response.status===200){
            console.log('Usuário criado com sucesso');
        };

        return true;
    } catch(error: any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 504:
                    console.log("Erro no envio do email. Isso nao quer dizer que o usuário não foi criado com sucesso, mas que não foi possível enviar o email de boas vindas, cheque a validade do email. Erro: ", error);
                    return "Usuário criado, mas cheuqe a validade do email.";
                case 409:
                    console.log("Já existe um usuário com o nome ou email utilizado Erro: ", error);
                    return "Professor já existe.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao registrar professor. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API: ", error.response.status);
                    return "Erro ao registrar professor. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao registrar professor. Tente novamente!";
    }
}