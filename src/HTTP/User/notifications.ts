import Cookies from "js-cookie";
import api from "../../services/api";
import type { notification } from "../../types/User";
import { formatData } from "../../utils/formatTime";

const notificationLabels: Record<string, string> = {
  BIRTHDAY: "Aniversário",
  PAYMENT: "Pagamento",
  CLASS: "Turma",
  WARNING: "Aviso",
  INFO: "Informação",
  SYSTEM: "Sistema",
};

export async function userNotifications() {
  try {
    const token = Cookies.get("token");

    const response = await api.get("/user/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const formattedNotifications: notification[] =
      response.data.body.map((notify: any) => ({
        date: formatData(notify.date),
        category:
          notificationLabels[notify.kind] ?? "Notificação",
        description: notify.message,
        read: notify.read,
      }));

    if (formattedNotifications.length === 0) {
      return "Você não possui notificações.";
    }

    return formattedNotifications;
  } catch (error: any) {
    if (error.response) {
      switch (error.response.status) {
        case 404:
          return "Usuário não encontrado.";
        case 500:
          return "Erro interno no servidor.";
        default:
          return "Erro ao obter notificações.";
      }
    }

    if (error.request) {
      return "Verifique sua conexão.";
    }

    return "Erro inesperado.";
  }
}
