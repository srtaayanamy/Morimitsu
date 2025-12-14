import api from "../../services/api";
import { jwtDecode } from 'jwt-decode';
import { emailValidate } from "../../utils/Validations";
import Cookies from "js-cookie";
type token = {
    sub: string, 
    role: string, 
    iat: number, 
    exp: number
} 

export async function LoginVerufy(email: string, senha:string){
    try{

        //Verifica se a senha e o e-mail tem formatos válidos
        const resultado= emailValidate(email);

        if(email==='' || senha ===''){
            return "Preencha todos os campos obrigatórios!"
        }
        
        if(resultado=== false){
            return 'Formato de email inválido'
        }
        if(senha.length<8){
            return 'Senha deve ter 8 ou mais caracteres!'
        }

        //Requisição
        const response = await api.post("/user/login", {Email: email, Password: senha })
        
        const decodedToken = jwtDecode<token>(response.data.userId);
        console.log(decodedToken);

        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        

        Cookies.set("token", response.data.userId, {
            expires: expiresAt,
            path: "/",
        });

        Cookies.set("role", decodedToken.role, {
            expires: expiresAt,
            path: "/",
        });
        

        //Verifica se a requisição foi um sucesso
        console.log("Login feito com sucesso");
        
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