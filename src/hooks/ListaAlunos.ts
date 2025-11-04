import api from "../services/api";
import { type Aluno } from "../types/Aluno";

export async function listarAlunos() {
    try{
        const token= localStorage.getItem('token');
    
        //Faz a requisição
        const response = await api.get("/student",{
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if(response.status=== 200){
            console.log('Lista de alunos adquirida com sucesso')
            //Armezena os alunos
            const alunos: Aluno[] = response.data.data.map((item: any) => {
                const s = item.student;
                return {
                    id: s.id,
                    nome: s.personal?.name || "",
                    apelido: s.personal.nickname || "",
                    email: s.email || "",
                    sexo: s.personal.gender,
                    dataNascimento: s.personal.birthDate
                };
            });
            console.log(alunos);
            return alunos;
        }
        
        
    } catch(error){
        console.log("Erro: ", error);
        return false;
    }
}

export async function filtrarAniversariantes() {

    const alunos = await listarAlunos();
    //Verifica se o retorno de alunos é diferente do tipo aluno
    if( alunos === false ){
        return;
    } else if (alunos === undefined){
        return;
    };
    //Declara vairável do tipo aluno que guarda os aniversariantes do mês
    const aniversariantes : Aluno[] = [];

    //Estrutura de repetição que indentifica se o aluno faz aniversário no mês atual
    for (const aluno of alunos) {
    
      const DataNascimento = new Date(aluno.dataNascimento);
      const DataAtual = new Date();

      if ((DataNascimento.getMonth() === DataAtual.getMonth()) && (DataNascimento.getDate() >= DataAtual.getDate())){
        aniversariantes.push(aluno);
      }

    };
    
    console.log('Aniversariantes: ',aniversariantes);
    return aniversariantes;
}