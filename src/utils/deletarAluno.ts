import api from "../services/api";

export async function deleteAluno(id:string) {
    
    try{

        const response= await api.delete(`/student/${id}`);

        if(response.status===200){
            console.log('Aluno deletado com sucesso');
            return true;
        }
        
    } catch(error: any){
        
        if(error.response?.status===404){
            return 'Estudante não encontrado.';
        } else{
            console.log('Erro interno servidor: ', error)
            return 'Erro ao tentar excluir aluno. Tente novamente.';
        }
        
    }

}