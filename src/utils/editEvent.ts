import api from "../services/api";
import { parseBRDate } from "./editarAluno";

export async function editEvent(event:any) {
    try{
        const eventFormated: any = {};
        
        for (const key in event) {
            const value = event[key];
            if (value !== "" && value !== null && value !== undefined) {
                if(key === 'event_date'){
                    const FormatedDate = parseBRDate(value)
                    const formatedValue = new Date(FormatedDate).toISOString();
                    eventFormated[key] = formatedValue;
                } else{
                    eventFormated[key] = value;
                }
            }
        };

        //Converte a data de nacimento do tipo string para o tipo ISO
        const token = localStorage.getItem('token');

        //Requisição
        await api.put(`/events/${event.id}`, eventFormated,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
        
        console.log('Evento cadastrado com sucesso.')
        return true;
    } catch (error: any) {
        if (error.response) {
            switch (error.response.status) {
                case 404:
                    console.log("Turma não encontrada. Erro:", error);
                    return "Turma não encontrada.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao cadastrar evento. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao cadastrar evento. Tente novamente!";
            }
        }

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
    
        // Qualquer outro erro
        console.log("Erro interno no servidor: ", error);
        return "Erro ao cadastrar evento. Tente novamente!";

    }
}