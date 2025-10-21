import api from "../services/api";

export async function EnviarEmail(email:string) {
    try{
        const response = await api.put('/auth', {email: email})

        if(response.status=== 200){
            console.log('Código enviado com sucesso')
            return response.data.codeString
        }

    } catch(error){
        console.log('Erro: ', error)
        return false
    }

}