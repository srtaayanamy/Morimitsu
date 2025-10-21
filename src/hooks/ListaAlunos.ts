import api from "../services/api";
import { type Aluno } from "../types/Aluno";

export async function listarAlunos() {
    try{
        const token= localStorage.getItem('token');
    
        //Faz a requisição
        const response = await api.get("/student",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if(response.status=== 200){
            console.log('Lista de alunos adquirida com sucesso')
            //Armezena os alunos
            const alunos: Aluno[] = response.data.data.map((item: any) => {
                const s = item.student;
                return {
                    nome: s.personal?.name || "",
                    apelido: s.nickname || "",
                    email: s.email || "",
                    faixa: s.rank || "",
                    grau: s.rating
                };
            });
            console.log(alunos);
            return alunos;
        }
        
        
    } catch(error){
        console.log("Erro: ", error);
        return false;
    }
}