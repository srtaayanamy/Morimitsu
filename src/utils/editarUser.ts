import api from "../services/api";

export async function editaUser(user?: any) {
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

    if (response.status === 200 || response.status === 201) {
      console.log("Usuário editado com sucesso.");
      return true;
    }

    console.log("Falha ao editar usuário. Status:", response.status);
    return false;
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.log("Usuário não encontrado.", error);
          return "Usuário não encontrado.";
        case 500:
          console.log("Erro interno no servidor.", error);
          return "Erro interno no servidor. Tente novamente.";
        default:
          console.log("Erro inesperado:", error);
          return "Erro ao editar usuário.";
      }
    }
    console.log("Erro de rede ou requisição:", error);
    return "Erro ao conectar com o servidor.";
  }
}
