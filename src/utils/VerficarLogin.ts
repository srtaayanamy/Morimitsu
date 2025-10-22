import api from "../services/api";

function verificarEmail(email: string): boolean {
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
        const response = await api.post("/user/login", {Email: email, Password: senha })

        //Casos de status recebidos
        if(response.data.statusCode=== 200){
            console.log("Login feito com sucesso")
            localStorage.setItem("token", response.data.userId);
            localStorage.setItem("isLoggedIn", "true");
            return true
        }
        else if(response.data.statusCode=== 409){
            console.log('Senha incorreta')
            return "Senha incorreta!"
        }
        else if(response.data.statusCode=== 404){
            console.log('Usuário não existe')
            return "Usuário não existe!"
        }
        else{
            console.log('Erro interno no servidor')
            return "Erro interno no servidor"
        }

    }   
    catch(error: any){
        console.log("Deu errado:", error.response?.data || error.message);
        return false;
    }

}