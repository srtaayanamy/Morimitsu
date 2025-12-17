import Cookies from "js-cookie";
import api from "../../services/api";
import type { graduationRegister } from "../../types/Graduation";

export async function getRegistersGraduations() {
    try{

        //Pega o token do usuário
        const token = Cookies.get('token');

        //Requisição
        const response = await api.get(`/promotion_registry`, 
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const registers : graduationRegister[] = response.data.response.map((g: any) =>{
            return {
                id: g.id,
                date: g.date,
                beforePromotion: g.from_rank,
                afterPromotion: g.to_rank,
                student: {
                    id: g.student_id,
                    name: g.student_name
                }
            }
        })
        
        console.log('Dados retornados com sucesso: ', registers);
        return registers;

    } catch(error: any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){ 
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao buscar os registros de graduação. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao buscar os registros de graduação. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao buscar os registros de graduação. Tente novamente!";
       
    }
}