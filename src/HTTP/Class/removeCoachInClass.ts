import api from "../../services/api";
import Cookies from "js-cookie";


export async function removeCoachInClass(classId: string, coachIds: string) {
    try{
        console.log("Id da turma: ",classId,"\nId do professor: ", coachIds)

        const token = Cookies.get('token');
        await api.post(`/class/${classId}/remove-coach/`,{coachIds: coachIds},
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return true
    } catch(error: any){
        if(error.response){
            switch(error.response.status){
                case 404:
                    console.log('Turma ou professor não econtrado. Erro: ', error);
                    return 'Turma ou professor não econtrado.';
                case 500:
                    console.log('Erro interno no servidor.', error);
                    return 'Não foi possível remover o professor da turma. Tente novamente!';
                default:
                    console.log("Erro desconhecido da API:", error.response);
                    return "Não foi possível remover o professor da turma. Tente novamente!";
            }
        }

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Servidor não respondeu. Verifique sua conexão.";
        }

        //Qualquer outro tipo de erro
        console.error("Erro inesperado:", error.message);
        return "Não foi possível remover o professor da turma. Tente novamente!";
    }
}