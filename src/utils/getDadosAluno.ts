import api from "../services/api";
import type { Aluno } from "../types/Aluno";
import type { Turma } from "../types/Turma";

export function formatarData(dataISO: string) {
  if (!dataISO) return "Não informada";
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR");
}

export async function pegaDadosAluno(id: string) {
  try {

    const response = await api.get(`/student/${id}`);7

    console.log("Aluno encontrado", response.data);

    //Guarda a lista de turmas retornados pela API
    const turmas: Turma[] = response.data.data.student.classes.map((classe: any) => ({
      id: classe.id,
      nome: classe.name
    }));

    const aluno: Aluno = {
      nome: response.data.data.student.personal.name || "",
      apelido: response.data.data.student.nickname || "",
      dataNascimento: formatarData(response.data.data.student.personal.birthDate) || "",
      telefone: response.data.data.student.personal.contact || "",
      sexo: response.data.data.student.personal.sexo || "",
      CPF: response.data.data.student.personal.CPF || "",
      faixa: response.data.data.student.form.Rank || "",
      grau: response.data.data.student.form.Rating || "",
      frequencia: response.data.data.student.form.Presence || 0,
      Responsavel: response.data.data.student.parents.parentName || "",
      telefoneResponsavel: response.data.data.student.parents.parentContact || "",
      matricula: response.data.data.student.form.studentId || "",
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
