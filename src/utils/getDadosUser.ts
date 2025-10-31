import api from "../services/api";

export async function pegaDadosUser() {
    try{

        const response= await api.get('/user/profile');

        if(response.status===200){
            console.log('Usuário encontrado.');
            return response.data;
        }

    } catch(error: any){

        switch(error.response.status){
            case 404:
                console.log('Usuário não encontrado.')
                return 'Usuário não encontrado.'
            case 500:
                console.log('Erro interno no servidor.')
                return 'Não foi possível acessar os dados. Tente novamente.'
        }
        console.log('Erro interno no servidor.')
        return 'Não foi possível acessar os dados. Tente novamente.'
    }

}