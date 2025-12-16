import api from "../../services/api";
import type { Student } from "../../types/Student";
import type { Class } from "../../types/Class";
import { getFrequencieRequired } from "../Frequencie/getFrequencieRequered";
import { formatData } from "../../utils/formatTime";

export async function getStudent(id: string) {
  try {
    //Requisição
    const response = await api.get(`/student/${id}`);

    console.log("Aluno encontrado", response.data);

    //Guarda a lista de turmas retornados pela API
    const Classes: Class[] = response.data.data.student.classes.map((classe: any) => ({
      id: classe.id,
      name: classe.name
    }));

    //Pega a frequencia requirida para a graduação na faixa do aluno
    let rank = response.data.data.student.form.Rank;
    const age = response.data.data.student.personal.age;
    let required_frequencie = await getFrequencieRequired(rank, age);

    rank = rank.replace('_', '/')

    //Verifica se ocorreu um erro, se sim, seta a frequencia requerida como 0
    if(typeof required_frequencie === 'string'){
      required_frequencie = 0
    } else{
      required_frequencie = required_frequencie.needed_frequency;
    }

    //Cria um objeto do tipo aluno e retorna ele
    const student: Student = {
      id: id,
      personal:{
        name: response.data.data.student.personal.name || "",
        nickName: response.data.data.student.nickname || "",
        birthDate: formatData(response.data.data.student.personal.birthDate) || "",
        contact: response.data.data.student.personal.contact || "",
        gender: response.data.data.student.personal.gender || "",
        CPF: response.data.data.student.personal.CPF || "",
        email: response.data.data.student.email || "",
        age: response.data.data.student.personal.age,
        parent: response.data.data.student.parents.parentName || "",
        parentContact: response.data.data.student.parents.parentContact || ""
      },
      form:{
        rank: rank || "",
        rating: response.data.data.student.form.Rating || "",
        frequencie: response.data.data.student.form.Presence || 0,
        RequiredFrequencie: required_frequencie,
        enrollment: response.data.data.student.form.IFCE_student_registration || "",
        comments: response.data.data.student.form.Comments || "",
        classes: Classes,
        userID: response.data.data.student.form.userId
      }
    };

    return student;
    
  } catch (error: any) {
    //Se o servidor respondeu com erro
    if (error.response) {

      switch (error.response.status) {
        case 404:
          console.log("Aluno não encontrado. Erro: ", error);
          return "Aluno não encontrado.";
        case 500:
          console.log("Erro interno no servidor. Erro:", error);
          return "Erro ao buscar os dados do aluno. Tente novamente!";
        default:
          console.log("Erro desconhecido da API:", error.response.status);
          return "Erro ao buscar os dados do aluno. Tente novamente!";
      }
    }

    //Verifica se a requisição foi feita, mas não houve resposta
    if (error.request) {
      console.log("Servidor não respondeu:", error.request);
      return "Servidor não respondeu. Verifique sua conexão.";
    }

    //Qualquer outro tipo de erro
    console.error("Erro inesperado:", error.message);
    return "Erro inesperado ao buscar os dados do aluno.";
  }
}
