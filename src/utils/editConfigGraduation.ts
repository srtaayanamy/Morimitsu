import api from "../services/api";

export async function editConfigGraduation(id: string, frequencie: number){
    try{
        //Verifica se os ids estão vazios
        if(!frequencie){
            return 'Frequencia não informada.';
        } else if(!id){
            return 'Id da configuração não informado.';
        }

        const response = await api.put(`/config/${id}`, {
            needed_frequency: frequencie
        });

        console.log(response.data)
        if(response.status===200){
            console.log('Configuração de graduação editada com sucesso.');
            return 'Configuração de graduação editada com sucesso.';
        }

    } catch(error: any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Configuração não encontrada. Erro: ", error);
                    return "Configuração de graduação não encontrada.";    
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao editar configuração de graduação. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao editar configuração de graduação. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao editar configuração de graduação. Tente novamente!";
       
    }
}