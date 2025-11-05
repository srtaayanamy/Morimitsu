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
        const reponseForm= await api.put(`/student/${id}/form`,{dadosPersonalFiltrados})

        if(reponseForm.status===200 && reponsePersonal.status===200){
            return true
        }

    } catch(error:any){
        if(error.response?.status===404){
            return 'Aluno não encontrado.';
        } else{
            return 'Erro interno no servidor.';
        }
    }
}
