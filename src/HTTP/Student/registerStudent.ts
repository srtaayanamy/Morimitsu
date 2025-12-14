import api from "../../services/api";
import {type Student } from "../../types/Student";
import { AgeCalculator } from "../../utils/AgeCalculator";
import { emailValidate, validateCPF } from "../../utils/Validations";

export async function registerStudent(student: Student) {
    try{
        if(AgeCalculator(student.personal.birthDate ? student.personal.birthDate: '') > 120){
            return 'O aluno não pode ter mais de 120 anos.'
        }
        //Redefine o sexo do aluno para a forma aceita na API
        if(student.personal.gender === 'Masculino'){
            student.personal.gender= 'male'
        } else{
            student.personal.gender= 'female'
        };

        //Converte a data de nacimento do tipo string para o tipo ISO
        const birthDate = new Date(student.personal.birthDate? student.personal.birthDate : '').toISOString();

        //Verfica se o email tem um formato válido
        if(emailValidate(student.personal.email ? student.personal.email: '')===false){
            return 'Formato de email inválido.';
        } else if(validateCPF(student.personal.CPF ? student.personal.CPF : '') === false){
            return 'Formato de email inválido.'
        }else if(AgeCalculator(student.personal.birthDate ? student.personal.birthDate : '') > 120){
            return 'O aluno não pode ter mais de 120 anos.'
        }

        let classIds: string[] = [];
        if(student.form?.classes !== undefined && student.form.classes.every(t => typeof t === "string")){
            classIds = student.form.classes;
        }

        console.log(student)
        //Requisição
        await api.post('/student', 
            {
                name: student.personal.name, 
                email: student.personal.email, 
                CPF: student.personal.CPF, 
                contact: student.personal.contact, 
                birthDate: birthDate, 
                nickname: student.personal.nickName, 
                rank: student.form?.rank, 
                comments: student.form?.comments, 
                presence: student.form?.frequencie, 
                parentsContact: student.personal.parentContact, 
                parentName: student.personal.parent, 
                rating: student.form?.rating, 
                classId: classIds,
                gender: student.personal.gender,
                ifce_registration: student.form?.enrollment
            });
            
        
        console.log('Aluno cadastrado com sucesso.')
        return true;
    } catch (error: any) {
        if (error.response) {
            switch (error.response.status) {
                case 405:
                    console.log("Nome ou contato do responsável não informado. Erro:", error);
                    return "Nome ou contato do responsável não informado.";
                case 409:
                    console.log("Aluno já existe. Erro:", error);
                    return "Aluno já existe.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao registrar aluno. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao registrar aluno. Tente novamente!";
            }
        }

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
    
        // Qualquer outro erro
        console.log("Erro interno no servidor: ", error);
        return "Erro ao registrar aluno. Tente novamente.";

    }
}