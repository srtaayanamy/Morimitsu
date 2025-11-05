import api from "../services/api";

export async function removeAlunoDaTurma(idAluno:string, idTurma: string) {

    try{
        //Verifica se os ids estão vazios
        if(idAluno === '' || idTurma===''){
            return false;
        }

        const response = await api.delete(`/student/${idAluno}/leave/${idTurma}`);

        console.log(response.data)
        if(response.status===200){
            console.log('Aluno removido com sucesso.');
            return 'Aluno removido com sucesso.';
        }

    } catch(error: any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Turma ou aluno não encontrado. Erro: ", error);
                    return "Turma ou aluno não encontrado.";    
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao remover aluno da turma. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao remover aluno da turma. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao remover aluno da turma. Tente novamente!";
       
    }

}