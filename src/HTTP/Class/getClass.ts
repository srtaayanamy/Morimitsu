import api from "../../services/api";
import type { Student } from "../../types/Student";
import type { Coach } from "../../types/User";
import type { Class } from "../../types/Class";
import { formatTime } from "../../utils/formatTime";

export async function getClass(id: string) {
  try {
    //Faz requsição dos dados da turma para a API
    const response = await api.get(`/class/${id}`);

    console.log("Turma encontrada");
    console.log("Response da turma:", response.data.class);

    //Guarda a lista de professores retornados pela API
    const coachs: Coach[] = response.data.coachs.map((coach: any) => ({
        id: coach.id,
        student: {
          personal:{
            name: coach.name
          }
        },
      })
    );
    console.log(coachs)

    //Guarda a lista de alunos retornados pela API
    const students: Student[] = response.data.students.map((student: any) => ({
      id: student.personal.id,
      personal:{
        name: student.personal.name,
        nickName: student.personal.nickname,
        gender: student.personal.gender,
        birthDate: student.personal.birthDate
      },
      form:{
        rank: student.form.Rank,
        rating: student.form.Rating
      }
    }));
    console.log(students)

    const StudentsNum = students.length;

    //Guarda as informações retornadas pela API
    const Class: Class = {
      id: id,
      name: response.data.class.name,
      MaxAge: response.data.class.maxAge,
      MinAge: response.data.class.minAge,
      startTime: formatTime(response.data.class.startTime) ?? '',
      endTime: formatTime(response.data.class.endTime) ?? '',
      students: students,
      coachs: coachs,
      numStudents: StudentsNum,
      URLImage: response.data.class.icon_url,
    };

    return Class;
    
  } catch (error: any) {
    if(error.response){
      switch(error.response.status){
        case 404:
          console.log("Turma não encontrada. Erro: ", error);
          return "Turma não encontrada.";
        case 500:
          console.log("Erro interno no servidor. Erro:", error);
          return "Erro ao buscar os dados da turma. Tente novamente!";
        default:
          console.log("Erro desconhecido da API:", error.response.status);
          return "Erro ao buscar os dados da turma. Tente novamente!";
      }
    }

    //Verifica se a requisição foi feita, mas não houve resposta
    if (error.request) {
      console.log("Servidor não respondeu:", error.request);
      return "Servidor não respondeu. Verifique sua conexão.";
    }

    //Qualquer outro tipo de erro
    console.error("Erro inesperado:", error.message);
    return "Erro ao buscar os dados da turma. Tente novamente!";

  }
}
