import api from "../services/api";

export async function editaTurma(id:string, dados: any) {
    try{
        //Verifica se a alterações
        if(dados === undefined){
            return false
        }
        //Filtra os dados para que fique somente os preenchidos
        const dadosFiltrados: any = {};
        for (const key in dados) {
            const value = dados[key];
            if (value !== "" && value !== null && value !== undefined) {
                dadosFiltrados[key] = value;
            }
        }
        
        const response= await api.put(`/class/${id}`,{dadosFiltrados})

        console.log('Retorno da requisição: ', response.data)
        console.log('Retorno do status da requisição: ', response.status)

        //Verifica se as duas rquisições deram certo.
        if(response.status===200){
            console.log('Dados atualizados com sucesso')
            return true
        }

    } catch(error:any){
        //Trata o erro retornado da API
        if(error.response.status===404){
            console.log('Aluno não encontrado.')
            return 'Aluno não encontrado.';
        } else{
            console.log('Erro interno no servidor.')
            return 'Aluno não encontrado.';
        }
    }
}