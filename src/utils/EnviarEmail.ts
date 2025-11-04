import api from "../services/api";

export async function EnviarEmail(email:string) {
    try{
        //Requisição
        const response = await api.put('/auth', {email: email});

        //Exibe mensagem se foi um sucesso
        if(response.status===200){
            console.log('Código enviado com sucesso');
        }
        return response.data.codeString;

    } catch(error: any){
        
        if(error.response){

            switch(error.response.status){
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao enviar o código para o email. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao enviar o código para o email. Tente novamente!";
            }

        }

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.warn("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        //Qualquer outro erro
        console.log('Erro interno no servidor: ', error);
        return 'Erro ao enviar o código para o email. Tente novamente.';  
    }

}