import api from "../services/api";
import type { Aluno } from "../types/Aluno";
import type { Turma } from "../types/Turma";
import { getFrequencieRequired } from "./getFrequencieRequered";

export function formatarData(dataISO: string) {
  if (!dataISO) return "Não informada";
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR");
}

export async function pegaDadosAluno(id: string) {
  try {

    const response = await api.get(`/student/${id}`);

    console.log("Aluno encontrado", response.data);

    //Guarda a lista de turmas retornados pela API
    const turmas: Turma[] = response.data.data.student.classes.map((classe: any) => ({
      id: classe.id,
      nome: classe.name
    }));

    let rank = response.data.data.student.form.Rank;
    let required_frequencie = await getFrequencieRequired(rank);

    rank = rank.replace('_', '/')

    if(typeof required_frequencie === 'string'){
      required_frequencie = 0
    } else{
      
      required_frequencie = required_frequencie.needed_frequency;
    }

    console.log(required_frequencie)
    const aluno: Aluno = {
      nome: response.data.data.student.personal.name || "",
      apelido: response.data.data.student.nickname || "",
      dataNascimento: formatarData(response.data.data.student.personal.birthDate) || "",
      telefone: response.data.data.student.personal.contact || "",
      sexo: response.data.data.student.personal.gender || "",
      CPF: response.data.data.student.personal.CPF || "",
      faixa: rank || "",
      grau: response.data.data.student.form.Rating || "",
      frequencia: response.data.data.student.form.Presence || 0,
      frequenciaRequerida: required_frequencie,
      Responsavel: response.data.data.student.parents.parentName || "",
      telefoneResponsavel: response.data.data.student.parents.parentContact || "",
      matricula: response.data.data.student.form.IFCE_student_registration || "",
      email: response.data.data.student.email || "",
      observacao: response.data.data.student.form.Comments || "",
      turmas,
      idade: response.data.data.student.personal.age,
    };

    return aluno;
    
  } catch (error: any) {
    console.error("Erro ao buscar aluno:", error);

    //Se o servidor respondeu com erro
    if (error.response) {

      switch (error.response.status) {
        case 404:
          console.log("Aluno não encontrado. Erro: ", error);
          return "Aluno não encontrado.";
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
      return "Servidor não respondeu. Verifique sua conexão.";
    }

    //Qualquer outro tipo de erro
    console.error("Erro inesperado:", error.message);
    return "Erro inesperado ao carregar os dados do aluno.";
  }
}
