import api from "../services/api"

export async function cadastrarTurma(nome: string, idadeMin: number, idadeMax: number, horarioInicio: string, horarioFim: string, URLimagem: string) {
    try{
        //Pega ID do usuário
        const id = localStorage.getItem('token')

        //Verifica de nome ou idade miníma não são inválidos
        if(nome== ''|| idadeMin==0){
            return false
        }

        console.log(URLimagem)
        //Faz a requisição de registro do aluno
        const response = await api.post("/class", 
            {
                name:nome, 
                minAge: idadeMin, 
                maxAge:idadeMax, 
                coachID: id, 
                iconURL: URLimagem, 
                startTime: horarioInicio, 
                endTime: horarioFim
            })
        
        if(response.status=== 200){
            console.log('Aluno registrado com sucesso.')
            return true
        }

    } catch (error: any) {
    
        switch(error.response.status){
            case 404:
                console.log("Usuário administrador ou professor nao foi encontrado. Se não for fornecido o ID a classe será atribuída a um usuário ADMIN aleatório. Erro: ", error);
                return "Usuário administrador ou professor nao foi encontrado.";
            case 409:
                console.log("Valor único violado. Provavelmente o nome da classe já existe. Erro: ", error);
                return "Turma já existe.";
            case 500:
                console.log("Erro interno no servidor. Erro:", error);
                return "Erro ao registrar turma. Tente novamente.";
        }

        console.log("Erro: ", error);
        return "Erro ao carregar turma. Tente novamente!";
    }
}