import api from "../services/api";

export async function deleteTurma(id:string) {
    try{
        const response= await api.delete(`/class/${id}`);
        //Veriica se a requisição foi um succeso
        if(response.status===200){
            console.log('Turma deletado com sucesso');
            return true;
        }
        
    } catch(error: any){
        //Veriica qual o erro retornado da API
        if(error.response.status===404){
            return 'Turma não encontrada.';
        } else{
            console.log('Erro interno servidor: ', error)
            return 'Erro ao tentar excluir turma. Tente novamente.';
        } 
    }
}