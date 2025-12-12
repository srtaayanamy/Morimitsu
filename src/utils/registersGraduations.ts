import api from "../services/api";
import type { graduationRegister } from "../types/Graduation";

export async function getRegistersGraduations() {
    try{

        const token = localStorage.getItem('token')
        const response = await api.get(`/promotion_registry`, 
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log(response.data.response)

        const registers : graduationRegister[] = response.data.response.map((g: any) =>{
            return {
                id: g.id,
                date: g.date,
                beforePromotion: g.from_rank,
                afterPromotion: g.to_rank,
                student: {
                    id: g.student_id
                }
            }
        })
        console.log('Registros: ', registers)
        
        console.log('Dados retornados com sucesso.');
        return;

    } catch(error: any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){ 
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao pegar os dados. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao pegar os dados. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao pegar os dados. Tente novamente!";
       
    }
}