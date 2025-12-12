import api from "../services/api";
import type { event } from "../types/event";

export async function eventList() {
    try {

    const token = localStorage.getItem("token");

    //Faz a requisição
    const response = await api.get("/events/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    //Armezena os eventos
    const events: event[] = response.data.events.map((item: any) => {
      
      return {
        id: item.id,
        title: item.title,
        event_date: item.event_date,
        class: item.class_id
      };
    });

    console.log(events);
    return events;
  } catch (error: any) {
    //Tratamento de erros
    if (error.response) {
      switch (error.response.status) {
        case 500:
          console.log("Erro interno no servidor. Erro:", error);
          return "Erro ao listar os eventos. Tente novamente!";
        default:
          console.log("Erro desconhecido da API:", error);
          return "Erro ao listar os eventos. Tente novamente!";
      }

    } 
    //Verifica se a requisição foi feita, mas não houve resposta
    if (error.request) {
      console.log("Servidor não respondeu:", error.request);
      return "Verifique sua conexão.";
    }

    // Qualquer outro erro
    console.log("Erro listar os eventos. Erro: ", error);
    return "Erro ao listar os eventos. Tente novamente!";
  }
}