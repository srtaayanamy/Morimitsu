import api from "../services/api";

export function verificarEmail(email: string): boolean {
  // Expressão regular para validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function verificarLogin(email: string, senha:string){

    //Verifica se a senha e o e-mail tem formatos válidos
    const resultado= verificarEmail(email);
    
    if(resultado=== false){
        return 'Formato de email inválido'
    }
    if(senha.length<8){
        return 'Senha deve ter 8 ou mais caracteres!'
    }

    try{
        //Requisição
        const response = await api.post("/user/login", {Email: email, Password: senha })

        //Verifica se a requisição foi um sucesso
        if(response.data.statusCode=== 200){
            console.log("Login feito com sucesso");
            localStorage.setItem("token", response.data.userId);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("role", response.data.role); 
        }
        return true;
    }   
    catch(error: any){
        //Tratamento de erros
        if (error.response) {
            switch(error.response.status){
                case 404:
                    console.log("Usuário não existe. Erro: ", error);
                    return "Usuário não existe!";
                case 409:
                    console.log("Senha incorreta. Erro: ", error);
                    return "Senha incorreta!";
                case 500:
                    console.log("Erro interno no servidor. Erro:", error);
                    return "Erro ao fazer login. Tente novamente!";
                default:
                    console.log("Erro desconhecido da API:", error.response.status);
                    return "Erro ao fazer login. Tente novamente!";
            }
        }  

        //Verifica se a requisição foi feita, mas não houve resposta
        if (error.request) {
            console.log("Servidor não respondeu:", error.request);
            return "Verifique sua conexão.";
        }
        
        //Qualquer outro erro
        console.log("Erro: ", error);
        return "Erro ao fazer login. Tente novamente!";
    }
}