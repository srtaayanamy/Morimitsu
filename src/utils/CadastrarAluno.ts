import api from "../services/api";
import { type Aluno } from "../types/Aluno";

export async function cadastrarAluno(aluno: Aluno) {
    try{   

        if(aluno.nome==='' || aluno.email==='' || aluno.CPF==='' || aluno.sexo===''){

            return 'Por favor preencha todos os campos obrigatórios!'
            
        }

        //Corrige o sexo para o que a API exige
        if(aluno.sexo=== "Masculino"){
            aluno.sexo = 'male';
        } else{
            aluno.sexo = 'female';
        }

        console.log(aluno.sexo)

        //Requisição
        const response= await api.post('/student', 
            {
                name: aluno.nome, 
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
                gender: aluno.sexo
            })

        //Analisa o resultado da requisição e checa se o aluno foi criado ou não
        if (response.status=== 201){
            console.log('Aluno registrado com sucesso')
            return true
        } else if(response.status===409){
            console.log('Aluno já existe')
            return 'Aluno já existe.'
        }else{
            console.log('Erro interno no servidor.')
            return "Erro ao registrar aluno. Tente novamente."
        }

    } catch(error: any){
        if(error.response.status=== 405){
            console.log('Reponsavel ou seu contato não informados.')
            return 'Por favor informe o responsável e seu contato.'
        }else{
            console.log('Erro: ', error)
            return "Erro ao registrar aluno. Tente novamente."
        }
        
    }
}