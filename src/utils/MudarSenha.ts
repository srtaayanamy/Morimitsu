import api from "../services/api";

export async function mudarSenha(novaSenha:string, refString: string, codigoDigitado: string) {
    try{

        const response= await api.put('/auth', {passport: codigoDigitado, refString: refString, newPassword: novaSenha})

        if(response.status=== 200){
            console.log('Senha alterada com sucesso')
            return true
        }

    } catch(error){
        console.log('Erro: ', error)
        return false
    }
}