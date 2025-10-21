import api from "../services/api"

export async function cadastrarTurma(nome: string, idadeMin: number, idadeMax: number, horarioInicio: string, horarioFim: string, URLimagem: string) {
    try{
        //Pega ID do usuário
        const id = localStorage.getItem('token')

        //Verifica de nome ou idade miníma não são inválidos
        if(nome== ''|| idadeMin==0){
            return false
        }

        //Faz a requisição de registro do aluno
        const response = await api.post("/class", {name:nome, minAge: idadeMin, maxAge:idadeMax, coachID: id, iconURL: URLimagem, startTime: horarioInicio, endTime: horarioFim})
        
        if(response.status=== 200){
            console.log('Aluno registrado com sucesso.')
            return true
        } 

    } catch(error){
        console.log('Erro: ', error)
        return false
    }
}