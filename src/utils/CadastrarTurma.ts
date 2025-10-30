import api from "../services/api"

export async function cadastrarTurma(nome: string, idadeMin: number, idadeMax: number, horarioInicio: string, horarioFim: string, URLimagem: string, coachIDs: string[]) {
    try{

        //Verifica de nome ou idade miníma não são inválidos
        if(nome== ''|| idadeMin==0){
            return 'Nome e idade miníma devem ser preenchidos!'
        } else if(idadeMin >= idadeMax){
            return 'Idade miníma deve ser menor que a idade máxima!'
        }

        //Faz a requisição de registro do aluno
        const response = await api.post("/class", 
            {
                name:nome, 
                minAge: idadeMin, 
                maxAge:idadeMax,  
                iconURL: URLimagem, 
                startTime: horarioInicio, 
                endTime: horarioFim,
                coachID: coachIDs,
            })
        
        console.log(response.status)

        if(response.status=== 201){
            console.log('Turma registrada com sucesso.')
            return true;
        } else if(response.status=== 404){
            console.log('Usuário administrador ou professor nao foi encontrado. Se não for fornecido o ID a classe será atribuída a um usuário ADMIN aleatório');
            return 'Usuário administrador ou professor nao foi encontrado.';
        } else if(response.status=== 409){
            console.log('Valor único violado. Provavelmente o nome da classe já existe.');
            return 'Turma já existe.';
        } else{
            console.log('Erro interno no servidor.');
            return 'Erro ao registrar turma. Tente novamente.';
        }

    } catch(error){
        console.log('Erro: ', error)
        return 'Erro ao registrar turma. Tente novamente.';
    }
}