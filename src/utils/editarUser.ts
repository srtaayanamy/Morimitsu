import api from "../services/api";

export async function editaUser(user? : any) {
    
    try{    
        const dadosUserFiltrados: any = {};
        for (const key in user) {
            const value = user[key];
            if (value !== "" && value !== null && value !== undefined) {
                dadosUserFiltrados[key] = value;
            }
        }

        //Verifica se há algum dado para modificar
        if(dadosUserFiltrados.length === 0){
            console.log('Nenhuma mudança feita.');
            return false;
        }

        const response = await api.put('/user', {dadosUserFiltrados});

        if(response.status=== 201){
            console.log('Uusário editado.');
            return true;
        }
        return true
    } catch(error:any){
        switch(error.response.status){
            case 404:
                console.log('Usuário não encontrado. Erro: ', error);
                return 'Usuário não encontrado.'
            case 500:
                console.log("Erro interno no servidor. Erro:", error);
                return "Erro ao registrar turma. Tente novamente.";
        }
        console.log("Erro interno no servidor. Erro:", error);
        return "Erro ao registrar turma. Tente novamente.";
    }

}