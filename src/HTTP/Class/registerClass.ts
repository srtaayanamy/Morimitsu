import api from "../../services/api"

export async function registerClass(name: string, MinAge: number, MaxAge: number, startTime: string, endTime: string, URLimagem: string, coachIds?: string[]) {
    try{

        //Verifica de nome ou idade miníma não são inválidos
        if(name== ''|| MinAge==0){
            return false
        }

        if(!coachIds || coachIds === null){
            coachIds = [];
        }

        //Formata os horários para um formato aceito pela API
        startTime = startTime.replace('h', '')
        endTime = endTime.replace('h', '')

        console.log(URLimagem)
        //Faz a requisição de registro do aluno
        await api.post("/class", 
            {
                name:name, 
                minAge: MinAge, 
                maxAge: MaxAge, 
                coachID: coachIds, 
                iconURL: URLimagem, 
                startTime: startTime, 
                endTime: endTime
            }
        )
        
        
        console.log('Aluno registrado com sucesso.')
        return true
    } catch (error: any) {
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Usuário administrador ou professor nao foi encontrado. Se não for fornecido o ID a classe será atribuída a um usuário ADMIN aleatório. Erro: ", error);
                    return "Usuário administrador ou professor nao foi encontrado.";
                case 409:
                    console.log("Valor único violado. Provavelmente o nome da classe já existe. Erro: ", error);
                    return "Turma já existe.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao registrar a turma. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao registrar a turma. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao registrar turma. Tente novamente!";
        
    }
}