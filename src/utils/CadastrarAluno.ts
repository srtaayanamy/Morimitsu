import api from "../services/api";
import { type Aluno } from "../types/Aluno";
import { verificarEmail } from "./VerficarLogin";

export async function cadastrarAluno(aluno: Aluno) {
    try{
        //Redefine o sexo do aluno para a forma aceita na API
        if(aluno.sexo === 'Masculino'){
            aluno.sexo= 'male'
        } else{
            aluno.sexo= 'female'
        };

        //Converte a data de nacimento do tipo string para o tipo ISO
        const birthDate = new Date(aluno.dataNascimento).toISOString();

        //Verfica se o email tem um formato válido
        if(verificarEmail(aluno.email)===false){
            return 'Formato de email inválido.';
        }

        let classIds: string[] = [];
        if(aluno.turmas !== undefined && aluno.turmas.every(t => typeof t === "string")){
            classIds = aluno.turmas;
        }
        

        //Requisição
        const response= await api.post('/student', 
            {
                name: aluno.nome, 
                email: aluno.email, 
                CPF: aluno.CPF, 
                contact: aluno.telefone, 
                birthDate: birthDate, 
                nickname: aluno.apelido, 
                rank: aluno.faixa, 
                comments: aluno.observacao, 
                presence: aluno.frequencia, 
                parentsContact: aluno.telefoneResponsavel, 
                parentName: aluno.Responsavel, 
                rating: aluno.grau, 
                classId: classIds,
                gender: aluno.sexo,
                ifce_registration: aluno.matricula
            });
            
        if(response.status===200){
            console.log('Aluno cadastrado com sucesso.')
        }

        return true;
    } catch (error: any) {
        if (error.response) {
            switch (error.response.status) {
                case 409:
                    console.log("Aluno já existe. Erro:", error);
                    return "Aluno já existe.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao carregar os dados do aluno. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao carregar os dados do aluno. Tente novamente!";
            }
        }

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
    
        // Qualquer outro erro
        console.log("Erro interno no servidor: ", error);
        return "Erro ao editar usuário. Tente novamente.";

    }
}