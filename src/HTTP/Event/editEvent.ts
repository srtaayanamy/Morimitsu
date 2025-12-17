import Cookies from "js-cookie";
import api from "../../services/api";
// import { formatTime } from "../../utils/formatTime";
import { isDateValid } from "../../utils/Validations";

export async function editEvent(event: any) {
  try {
    if (event.event_date && !isDateValid(event.event_date)) {
      return "Impossivel editar a data para uma anterior a atual.";
    }

    const eventFormated: any = {};

    for (const key in event) {
      const value = event[key];
      if (value !== "" && value !== null && value !== undefined) {
        if (key === "event_date") {
          const date = new Date(`${value}T12:00:00`);
          eventFormated[key] = date.toISOString();
        } else {
          eventFormated[key] = value;
        }
      }
    }

    //Pega o toke do usuário
    const token = Cookies.get("token");

    //Requisição
    await api.put(`/events/${event.id}`, eventFormated, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Evento editado com sucesso.");
    return true;
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          console.log("Turma não encontrada. Erro:", error);
          return "Turma não encontrada.";
        case 500:
          console.log("Erro interno no servidor. Erro:", error);
          return "Erro ao editar evento. Tente novamente!";
        default:
          console.log("Erro desconhecido da API:", error.response.status);
          return "Erro ao editar evento. Tente novamente!";
      }
    }

    //Verifica se a requisição foi feita, mas não houve resposta
    if (error.request) {
      console.log("Servidor não respondeu:", error.request);
      return "Verifique sua conexão.";
    }

    // Qualquer outro erro
    console.log("Erro interno no servidor: ", error);
    return "Erro ao editar evento. Tente novamente!";
  }
}