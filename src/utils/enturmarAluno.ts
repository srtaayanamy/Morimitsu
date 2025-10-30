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
        //Trata o erro retornado da API
        switch(error.response.status){
            case 404:
                console.log(error)
                return 'Aluno ou classe não encontrados.'
            case 405:
                console.log(error)
                return 'A idade do aluno não se enquadra na faixa etária da turma.'
            case 500:
                console.log('Erro interno no servidor: ', error)
                return 'Erro ao tentar enturma o aluno na turma. Tente novamente.'
        }
    }

}