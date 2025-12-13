import api from "../services/api";

//  editaUser(name: string) 
export async function editaUser(name: string, id?:string) {
  try {
    // Envia os dados diretamente (sem aninhar)
    const token = localStorage.getItem('token');
    await api.put("/user", {name: name},
      {
        params:{
          id: id
        },
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("Usuário editado com sucesso.");
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
          return "Erro ao tentar editar usuário. Tente novamente!";
        default:
          console.log("Erro desconhecido da API:", error.response.status);
          return "Erro ao tentar editar usuário. Tente novamente!";
      }

    } 
    //Verifica se a requisição foi feita, mas não houve resposta
    if (error.request) {
      console.log("Servidor não respondeu:", error.request);
      return "Verifique sua conexão.";
    }

    // Qualquer outro erro
    console.log("Erro interno no servidor: ", error);
    return "Erro ao tentar editar do usuário. Tente novamente.";
  }
}
