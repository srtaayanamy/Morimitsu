import api from "../services/api";
import type { NextGraduantionStudent } from "../types/Graduation";
import { type Student, type StudentParams } from "../types/Student";
import Cookies from "js-cookie";

export async function StudentList(filters?:StudentParams) {
  try {

    const params: any = {};
    for (const key in filters) {
      const typedKey = key as keyof StudentParams;
      const value = filters[typedKey];

      if (value !== null && value !== undefined && value !== "") {
        params[typedKey] = value;
      }
    } 
    

    const token = Cookies.get('token');

    //Faz a requisição
    const response = await api.get("/student", {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //Armezena os alunos
    const students: Student[] = response.data.data.map((item: any) => {
      const s = item.student;
      let rank = s.personal.rank;
      
      if(rank !== undefined){
        rank = rank.replace('_', "/");
      }
      
      return {
        id: s.id,
        personal:{
          name: s.personal?.name || "",
          nickName: s.nickname || "",
          email: s.email || "",
          gender: s.personal.gender,
          birthDate: s.personal.birthDate,
        },
        form:{
          rank: rank || "",
          rating: s.personal?.rating ?? 0,
          userID: s.form?.userId
        }
      };
    });

    console.log(students);
    return students;
  } catch (error: any) {
    //Tratamento de erros
    if (error.response) {
      switch (error.response.status) {
        case 500:
          console.log("Erro interno no servidor. Erro:", error);
          return "Erro ao listar alunos. Tente novamente!";
        default:
          console.log("Erro desconhecido da API:", error);
          return "Erro ao listar alunos. Tente novamente!";
      }

    } 
    //Verifica se a requisição foi feita, mas não houve resposta
    if (error.request) {
      console.log("Servidor não respondeu:", error.request);
      return "Verifique sua conexão.";
    }

    // Qualquer outro erro
    console.log("Erro listar alunos. Erro: ", error);
    return "Erro ao listar alunos. Tente novamente!";
  }
}

export async function filtrarAniversariantes(mes?: number) {
  const students = await StudentList();
  //Verifica se o retorno de alunos é diferente do tipo aluno
  if (typeof students === 'string') {
    return;
  }
  //Declara vairável do tipo aluno que guarda os aniversariantes do mês
  const birthdayPeople: Student[] = [];

  const mesReferencia =
    mes !== undefined ? mes : new Date().getMonth();

  for (const aluno of students) {
    const dataNascimento = new Date(aluno.personal.birthDate ? aluno.personal.birthDate: '');

    if (dataNascimento.getMonth() === mesReferencia) {
      birthdayPeople.push(aluno);
    }
  }

  console.log("Aniversariantes: ", birthdayPeople);
  return birthdayPeople;
}

export async function NextGraduantionsPeople() {
  try {

    const token = Cookies.get('token');

    //Faz a requisição
    const response = await api.get("/student/find_close_to_promotion", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const nextPeopleGraduation : NextGraduantionStudent[] = response.data.response.map((item: any) => {
      return{
        id: item.id,
        studentId: item.student_id,
        name: item.name,
        from_rank: item.form.Rank,
        from_rating: item.form.Rating,
        to_rating: item.nextRating,
        to_rank: item.nextRank
      }
    })
    console.log("Próximos graduandos: \n",nextPeopleGraduation);

    //Armezena os alunos
    return nextPeopleGraduation;
  } catch (error: any) {
    //Tratamento de erros
    if (error.response) {
      switch (error.response.status) {
        case 500:
          console.log("Erro interno no servidor. Erro:", error);
          return "Erro ao listar os próximos graduandos. Tente novamente!";
        default:
          console.log("Erro desconhecido da API:", error);
          return "Erro ao listar os próximos graduandos. Tente novamente!";
      }

    } 
    //Verifica se a requisição foi feita, mas não houve resposta
    if (error.request) {
      console.log("Servidor não respondeu:", error.request);
      return "Verifique sua conexão.";
    }

    // Qualquer outro erro
    console.log("Erro listar alunos. Erro: ", error);
    return "Erro ao listar os próximos graduandos. Tente novamente!";
  }
}
