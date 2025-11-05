import api from "../services/api";

export async function editarAluno(id:string, personal:any, form: any) {
    try{
        if(personal === undefined && form === undefined){
            return false
        }

        const dadosPersonalFiltrados: any = {};
        for (const key in personal) {
            const value = personal[key];
            if (value !== "" && value !== null && value !== undefined) {
                dadosPersonalFiltrados[key] = value;
            }
        }

        const dadosFormFiltrados: any = {};
        for (const key in form) {
            const value = form[key];
            if (value !== "" && value !== null && value !== undefined) {
                dadosFormFiltrados[key] = value;
            }
        }
        
        const reponsePersonal = await api.put(`/student/${id}/personal`, dadosPersonalFiltrados)
        const reponseForm= await api.put(`/student/${id}/form`,dadosPersonalFiltrados)

        return true;
    } catch(error:any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Aluno não encontrado. Erro: ", error);
                    return "Aluno não encontrado.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao editar o aluno. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao editar o aluno. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao editar o aluno. Tente novamente!";
        
    }
}
