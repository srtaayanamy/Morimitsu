import api from "../services/api";
import { type Aluno } from "../types/Aluno";

export async function listarAlunos() {
  try {
    const token = localStorage.getItem("token");

    //Faz a requisição
    const response = await api.get("/student", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });



    //Armezena os alunos
    const alunos: Aluno[] = response.data.data.map((item: any) => {
      const s = item.student;
      let rank = s.personal.rank;
      
      if(rank !== undefined){
        rank = rank.replace('_', "/");
      }
      
      return {
        id: s.id,
        nome: s.personal?.name || "",
        apelido: s.nickname || "",
        email: s.email || "",
        sexo: s.personal.gender,
        dataNascimento: s.personal.birthDate,
        faixa: rank || "",
        grau: s.personal?.rating ?? 0,
        userID: s.form?.userId
      };
    });

    console.log(alunos);
    return alunos;
  } catch (error: any) {
    //Tratamento de erros
    if (error.response) {
      switch (error.response.status) {
        case 500:
          console.log("Erro interno no servidor. Erro:", error);
          return "Erro ao listar alunos. Tente novamente!";
        default:
          console.log("Erro desconhecido da API:", error.response.status);
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

export async function filtrarAniversariantes() {
  const alunos = await listarAlunos();
  //Verifica se o retorno de alunos é diferente do tipo aluno
  if (typeof alunos === 'string') {
    return;
  } else if (alunos === undefined) {
    return;
  }
  //Declara vairável do tipo aluno que guarda os aniversariantes do mês
  const aniversariantes: Aluno[] = [];

  //Estrutura de repetição que indentifica se o aluno faz aniversário no mês atual
  for (const aluno of alunos) {
    const DataNascimento = new Date(aluno.dataNascimento);
    const DataAtual = new Date();

    if (
      DataNascimento.getMonth() === DataAtual.getMonth() &&
      DataNascimento.getDate() >= DataAtual.getDate()
    ) {
      aniversariantes.push(aluno);
    }
  }

  console.log("Aniversariantes: ", aniversariantes);
  return aniversariantes;
}

export async function filtrarAlunos(filters: any) {
  
  try{
    const params: any = {};

    for (const key in filters) {
      const value = filters[key];
      if (value !== "" && value !== null && value !== undefined) {
        params[key] = value;
      }
    };

    const response = await api.get('/student', 
      {
        params
      }
    );

    const alunos: Aluno[] = response.data.data.map((item: any) => {
      const s = item.student;
      return {
        id: s.id,
        nome: s.personal?.name || "",
        apelido: s.nickname || "",
        email: s.email || "",
        sexo: s.personal.gender,
        dataNascimento: s.personal.birthDate,
        faixa: s.personal?.rank || "",
        grau: s.personal?.rating ?? 0,
      };
    });

    console.log(alunos);
    return alunos;
  } catch(error: any){
    //Tratamento de erros
    if (error.response) {
      switch (error.response.status) {
        case 500:
          console.log("Erro interno no servidor. Erro:", error);
          return "Erro ao listar alunos. Tente novamente!";
        default:
          console.log("Erro desconhecido da API:", error.response.status);
          return "Erro ao listar alunos. Tente novamente!";
      }

    } 
    //Verifica se a requisição foi feita, mas não houve resposta
    if (error.request) {
      console.log("Servidor não respondeu:", error.request);
      return "Verifique sua conexão.";
    }

    // Qualquer outro erro
    console.log("Erro listar alunos. Tente novamente.");
    return "Erro ao listar alunos. Tente novamente!";
  }
}
