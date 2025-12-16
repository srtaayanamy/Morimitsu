import api from "../../services/api";
import Cookies from "js-cookie";

export async function deleteEvent(id:string) {
    try{
        const token = Cookies.get('token')

        await api.delete(`/events/${id}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
        //Veriica se a requisição foi um succeso
        
        console.log('Evento deletado com sucesso');
        return true;
    } catch(error: any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Evento não encontrado. Erro: ", error);
                    return "Evento não encontrado.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao deletar a evento. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao deletar a evento. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao deletar a evento. Tente novamente!";
        
    }
}