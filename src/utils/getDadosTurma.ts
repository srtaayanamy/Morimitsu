import api from "../services/api";
import type { Aluno } from "../types/Aluno";
import type { Professor } from "../types/Professor";
import type { Turma } from "../types/Turma";

export async function pegaDadosTurma(id:string)  {
    try{
        console.log(id)
        const response= await api.get(`/class/${id}`)
        
        //Verifica o status da requisição
        if(response.status=== 200){
            console.log("Turma encontrada")

            //Guarda a lista de professores retornados pela API
            const professores: Professor[] = response.data.coachs.map((coach: any) => ({
                id: coach.id,
                nome: coach.name
            }));
            //Guarda a lista de alunos retornados pela API
            const alunos: Aluno[] = response.data.students.map((student: any) => ({
                id: student.id,
                nome: student.name,
                apelido: student.name,
                faixa: student.rank,
                grau: student.rating
            }));

            const NumeroDeAlunos = alunos.length;

            //Guarda as informações retornadas pela API
            const turma: Turma={
                id: id,
                nome:response.data.class.name,
                idadeMax: response.data.class.maxAge,
                idadeMin: response.data.class.minAge,
                horarioInicio: response.data.class.startTime,
                horarioFim: response.data.class.endTime,
                alunos:alunos,
                professores:professores,
                numAlunos: NumeroDeAlunos
            }
            return turma;
        } else if(response.status=== 404){
            console.log('Turma não encontrada')
            return 'Turma não encontrada';
        } else{
            console.log('Erro interno no servidor')
            return 'Erro ao carregar turma. Tente novamente!';
        }

    } catch(error){
        console.log('Erro: ', error);
        return 'Erro ao carregar turma. Tente novamente!';
    };

}