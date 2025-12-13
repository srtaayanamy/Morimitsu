import api from "../services/api";

export async function vincularProfessor(classId: string, coachId: string) {
    try{
        console.log("Id da turma: ",classId,"\nId do professor: ", coachId)

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
                case 404:
                    console.log('Turma ou professor não econtrado. Erro: ', error);
                    return 'Turma ou professor não econtrado.';
                case 500:
                    console.log('Erro interno no servidor.', error);
                    return 'Não foi possível vincular o professor a turma. Tente novamente.';
                default:
                    console.log("Erro desconhecido da API:", error.response);
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