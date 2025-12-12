import api from "../services/api";
import type { notification } from "../types/User";
import { formatarData } from "./getDadosAluno";

export async function userNotifications() {
    try{
        const token = localStorage.getItem('token');
        const response= await api.get('/user/notifications', 
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )

        console.log(response.data)
        const FormatedNotifications : notification[] = response.data.map((notify: any) =>{

            const FormatedDate = formatarData(notify.date);
            
            return{
                date: FormatedDate,
                category: notify.kind,
                description: notify.message,
                read: notify.read
            };
        })

        if(FormatedNotifications.length === 0){
            return 'Você não possue notificações.';
        }

        return FormatedNotifications;
    } catch(error: any){
        if(error.response){
            switch(error.response.status){
                case 404:
                    console.log('Usuário não encontrado. Erro:', error)
                    return 'Usuário não encontrado. Tente novamente.'
                case 500:
                    console.log('Erro interno no servidor. Erro: ', error);
                    return 'Erro ao tentar obter as notificações. Tente novamente.';
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao tentar obter as notificações. Tente novamente.";
            }
        }

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }

        //Qualquer outro tipo de erro
        console.error("Erro inesperado:", error.message);
        return "Erro ao tentar obter as notificações. Tente novamente.";
    }
}