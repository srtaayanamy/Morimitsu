import api from "../services/api";

export async function mudarSenha(novaSenha:string, refString: string, codigoDigitado: string) {
    try{

        const response= await api.put('/auth', 
            {
                passport: codigoDigitado, 
                refString: refString, 
                newPassword: novaSenha
            })

        if(response.status=== 200){
            console.log('Senha alterada com sucesso')
            return true
        }

    } catch(error: any){
        if(error.response){
            switch(error.response.status){
                case 500:
                    console.log('Erro interno no servidor.');
                    return 'Não foi possível mudar a senha. Tente novamente.';
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao tentar mudar a senha. Tente novamente!";
            }
        }

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.warn("Servidor não respondeu:", error.request);
            return "Servidor não respondeu. Verifique sua conexão.";
        }

        //Qualquer outro tipo de erro
        console.error("Erro inesperado:", error.message);
        return "Erro ao tentar mudar a senha.";
    }
}