import api from "../services/api";

export async function enturmaAluno(idAluno:string, idTurma: string) {

    try{
        //Verifica se os ids estão vazios
        if(idAluno === '' || idTurma===''){
            return false
        }

        const response = await api.post(`/student/${idAluno}/join/${idTurma}`);

        console.log(response.data)
        if(response.status===200){
            console.log('Aluno enturmado com sucesso.')
            return 'Aluno enturmado com sucesso.'
        }

    } catch(error: any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Turma ou aluno não encontrado. Erro: ", error);
                    return "Turma ou aluno não encontrado.";
                case 405:
                    console.log("O aluno é muito jovem para entrar na turma. Erro: ", error);
                    return "O aluno é muito jovem para entrar na turma.";    
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao enturmar aluno. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao enturmar aluno. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao enturmar aluno. Tente novamente!";
        
    }

}