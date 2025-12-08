import api from "../services/api";
import type { Frequencie } from "../types/Frequencie";

export async function getFrequencies(date?:string) {

    try{
        //Filtra apenas os parametros que não são undefined
        const params: any = {};

        if (date) params.date =  date;

        //Pega o token do usuário
        const token = localStorage.getItem('token')

        if(!token){
            return "Token não encontrado. Faça login novamente.";
        }

        const response = await api.get('/frequency', 
            {
                params,
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        )

        const frequencies = response.data.body;
        const groups: Record<string, Frequencie> = {};

        frequencies.forEach((f: any) => {

        const key = `${f.Date}_${f.class_id}_${f.coach_id}`;

        if (!groups[key]) {
            groups[key] = {
                Date: f.Date,
                class: f.Class,
                students: [],
                teacher: f.Coach
            };
        }

        groups[key].students.push(f.Student);
        });

        const FrequencieList: Frequencie[] = Object.values(groups);

        return FrequencieList;

    }catch(error:any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Alguma das entidades não foi encontrada, forneça o token, o id da turma e o id do estudante corretamente e verifique sua existencia. Erro: ", error);
                    return "Algum dos filtros está inválido.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao listar as frequências. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao listar as frequências. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao listar as frequências. Tente novamente!";   
    }    
}