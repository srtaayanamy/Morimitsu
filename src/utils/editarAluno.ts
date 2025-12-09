import api from "../services/api";
import { verificarEmail } from "./VerficarLogin";

function parseBRDate(dateStr: string) {
    const [dia, mes, ano] = dateStr.split("/");
    return `${ano}-${mes}-${dia}`; // yyyy-mm-dd
}


export async function editarAluno(id:string, personal:any, form: any) {
    try{
        if(personal === undefined && form === undefined){
            return false
        }
        
        const dadosPersonalFiltrados: any = {};
        for (const key in personal) {
            const value = personal[key];
            if (value !== null && value !== undefined) {
                if(key=== 'birthDate'){
                    const FormatedDate = parseBRDate(value)
                    const formatedValue = new Date(FormatedDate).toISOString();
                    dadosPersonalFiltrados[key] = formatedValue;
                }else if(key === 'email'){
                    if (verificarEmail(value)){
                        dadosPersonalFiltrados[key] = value;
                    } else{
                        return 'Formato de email inválido.'
                    }
                } else {
                    dadosPersonalFiltrados[key] = value;
                }
                
            }
        }


        const dadosFormFiltrados: any = {};
        for (const key in form) {
            const value = form[key];
            if ( value !== null && value !== undefined) {
                dadosFormFiltrados[key] = value;
            }
        }

        console.log('Personal: ', dadosPersonalFiltrados);
        console.log('Form: ', dadosFormFiltrados);

        const token = localStorage.getItem('token');

        if(dadosPersonalFiltrados.length !== 0){
            const reponsePersonal = await api.put(`/student/${id}/personal`, 
                dadosPersonalFiltrados,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                }
            )
        }

        if(dadosFormFiltrados.length !== 0){
            const reponseForm = await api.put(`/student/${id}/form`, 
                dadosFormFiltrados,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                }
            )
        }

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
