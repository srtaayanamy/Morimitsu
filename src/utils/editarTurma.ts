import api from "../services/api";

export async function editaTurma(id:string, dados: any) {
    try{
        //Verifica se a alterações
        if(dados === undefined){
            return false
        }
        //Filtra os dados para que fique somente os preenchidos
        const dadosFiltrados: any = {};
        for (const key in dados) {
            const value = dados[key];
            if (value !== "" && value !== null && value !== undefined) {
                dadosFiltrados[key] = value;
            }
        }
        
        const response= await api.put(`/class/${id}`,{dadosFiltrados})

        console.log('Retorno da requisição: ', response.data)
        console.log('Retorno do status da requisição: ', response.status)

        //Verifica se as duas rquisições deram certo.
        if(response.status===200){
            console.log('Dados atualizados com sucesso')
            return true
        }

    } catch(error:any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Turma não encontrada. Erro: ", error);
                    return "Turma não encontrada.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao editar a turma. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao editar a turma. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao editar a turma. Tente novamente!";
        
    }
}