import api from "../services/api";

export async function editaAluno(id:string, personal:any, form: any) {
    try{
        //Verifica se a alterações
        if(personal === undefined && form === undefined){
            return false
        }

        //Filtra os dados para que fique somente os preenchidos
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
        
        const reponsePersonal= await api.put(`/student/${id}/personal`,{dadosPersonalFiltrados})
        const reponseForm= await api.put(`/student/${id}/form`,{dadosPersonalFiltrados})

        console.log('Retorno do form: ', reponseForm.data)
        console.log('Retorno do status form: ', reponseForm.status)
        console.log('Retorno do personal: ', reponsePersonal.data)
        console.log('Retorno do status personal: ', reponsePersonal.status)
        //Verifica se as duas rquisições deram certo.
        if(reponseForm.status===200 && reponsePersonal.status===200){
            console.log('Dados atualizados com sucesso')
            return true
        }

    } catch(error:any){
        //Trata o erro retornado da API
        if(error.response.status===404){
            console.log('Aluno não encontrado.')
            return 'Aluno não encontrado.';
        } else{
            console.log('Erro interno no servidor.')
            return 'Aluno não encontrado.';
        }
    }
}