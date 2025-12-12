import api from "../services/api";

export async function registerEvent(title:string, date: string, classId: string) {
    try{
        //Redefine o sexo do aluno para a forma aceita na API
        if(!title || title === ''){
            return 'Insira o titulo do evento.'
        } else if(!date){
            return 'Informe a data do evento.'
        } else if(!classId){
            return 'Informe a turma na qual ocorrerá o evento.'
        }

        //Formata a data
        const formatedDate = new Date(date).toISOString()

        //Converte a data de nacimento do tipo string para o tipo ISO
        const token = localStorage.getItem('token');

        //Requisição
        await api.post('/events', 
            {
                title: title,
                event_date: formatedDate,
                class_id: classId
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
        
        console.log('Evento cadastrado com sucesso.')
        return true;
    } catch (error: any) {
        if (error.response) {
            switch (error.response.status) {
                case 404:
                    console.log("Turma não encontrada. Erro:", error);
                    return "Turma não encontrada.";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao cadastrar evento. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao cadastrar evento. Tente novamente!";
            }
        }

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
    
        // Qualquer outro erro
        console.log("Erro interno no servidor: ", error);
        return "Erro ao cadastrar evento. Tente novamente!";

    }
}