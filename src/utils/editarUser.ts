import api from "../services/api";

export async function editaUser(user: any) {
  try {
    // Filtra apenas campos válidos
    const dadosUserFiltrados: any = {};
    for (const key in user) {
      const value = user[key];
      if (value !== "" && value !== null && value !== undefined) {
        dadosUserFiltrados[key] = value;
      }
    }

    // Verifica se há algum dado para modificar
    if (Object.keys(dadosUserFiltrados).length === 0) {
      console.log("Nenhuma mudança feita.");
      return false;
    }

    // Envia os dados diretamente (sem aninhar)
    const response = await api.put("/user", dadosUserFiltrados);

    if (response.status === 201) {
      console.log("Usuário editado com sucesso.");
    }
    
    return true;
    
  } catch (error: any) {
    //Tratamento de erros
    if (error.response) {

      switch (error.response.status) {
        case 404:
          console.log("Usuário não encontrado.", error);
          return "Usuário não encontrado.";
        case 500:
          console.log("Erro interno no servidor. Erro:", error);
          return "Erro ao tentar editar do aluno. Tente novamente!";
        default:
          console.log("Erro desconhecido da API:", error.response.status);
          return "Erro ao tentar editar do aluno. Tente novamente!";
      }

    } 
    //Verifica se a requisição foi feita, mas não houve resposta
    if (error.request) {
      console.log("Servidor não respondeu:", error.request);
      return "Verifique sua conexão.";
    }

    // Qualquer outro erro
    console.log("Erro interno no servidor: ", error);
    return "Erro ao tentar editar do aluno. Tente novamente.";
  }
}
