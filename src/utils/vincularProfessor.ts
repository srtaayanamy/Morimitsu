import api from "../services/api";

export async function vincularProfessor(classId: string, coachId: string) {
    try{

        const token = localStorage.getItem('token');
        const response= await api.post(`/class/${classId}/assign-coach/${coachId}`,{},
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )
        

        if(response.status=== 200){
            console.log('')
            return true
        }

    } catch(error: any){
        if(error.response){
            switch(error.response.status){
                case 401:
                    console.log('Usuário não autorizado: ', error);
                    return 'Usuário não autorizado.';
                case 500:
                    console.log('Erro interno no servidor.');
                    return 'Não foi possível mudar a senha. Tente novamente.';
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao tentar mudar a senha. Tente novamente!";
            }
        }

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Servidor não respondeu. Verifique sua conexão.";
        }

        //Qualquer outro tipo de erro
        console.error("Erro inesperado:", error.message);
        return "Erro ao tentar mudar a senha.";
    }
}