import api from "../services/api";
import { type Aluno } from "../types/Aluno";

export async function cadastrarAluno(aluno: Aluno) {
    try{
        //Requisição
        const response= await api.post('/student', 
            {name: aluno.nome, 
                email: aluno.email, 
                CPF: aluno.CPF, 
                contact: aluno.telefone, 
                birthDate: aluno.dataNascimento, 
                nickname: aluno.apelido, 
                rank: aluno.faixa, 
                comments: aluno.observacao, 
                presence: aluno.frequencia, 
                parentsContact: aluno.telefoneResponsavel, 
                parentName: aluno.Responsavel, 
                rating: aluno.grau, 
                classId:aluno.turmas?aluno.turmas: undefined,
                sex: aluno.sexo
            })

        //Analisa o resultado da requisição e checa se o aluno foi criado ou não
        if (response.status=== 201){
            console.log('Aluno registrado com sucesso')
        }
        
        return true
    } catch (error: any) {
    
        switch(error.response.status){
            case 409:
                console.log("Aluno já existe. Erro: ", error);
                return "Aluno já existe.";
            case 500:
                console.log("Erro interno no servidor. Erro:", error);
                return "Erro ao registrar aluno. Tente novamente!";
        }

        console.log("Erro: ", error);
        return "Erro ao registrar aluno. Tente novamente!";
    }
}