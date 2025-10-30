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
        //Trata o erro retornado da API
        switch(error.response?.status){
            case 404:
                console.log(error);
                return 'Aluno ou classe não encontrados.';
            case 500:
                console.log('Erro interno no servidor: ', error);
                return 'Erro ao tentar enturma o aluno na turma. Tente novamente.';
        }
        console.log('Erro interno no servidor: ', error);
        return 'Erro ao tentar enturma o aluno na turma. Tente novamente.';
    }

}