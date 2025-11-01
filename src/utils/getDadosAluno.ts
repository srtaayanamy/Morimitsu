import api from "../services/api";
import type { Aluno } from "../types/Aluno";

function formatarData(dataISO: string) {
  if (!dataISO) return "Não informada";
  const data = new Date(dataISO);
  return data.toLocaleDateString("pt-BR");
}

export async function pegaDadosAluno(id: string) {
  try {
    const response = await api.get(`/student/${id}`);

    if (response.status === 200) {
      console.log("Aluno encontrado", response.data);

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
        matricula: response.data.data.student.form.studentId || "", // porque ta puxando o id?
        email: response.data.data.student.email || "",
        observacao: response.data.data.student.form.Comments || "",
        turmas: response.data.data.student.classId || [],
        idade: response.data.data.student.personal.age,
      };

      return aluno;
    } else if (response.status === 404) {
      return "Aluno não encontrado";
    } else {
      return "Erro ao carregar o aluno. Tente novamente!";
    }
  } catch (error: any) {
    
    switch(error.response.status){
      case 404:
        console.log("Aluno não encontrado. Erro: ", error);
        return "Aluno não encontrado";
      case 500:
        console.log("Erro interno no servidor. Erro:", error);
        return "Erro ao carregar os dados do aluno. Tente novamente!";
    }

    console.log("Erro: ", error);
    return "Erro ao carregar turma. Tente novamente!";
  }
}
