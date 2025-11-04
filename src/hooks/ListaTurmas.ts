import api from "../services/api";
import { type Turma } from "../types/Turma";

export async function listarTurmas(): Promise<Turma[] | false> {
  try {
    
    const token= localStorage.getItem('token');
    
    const response = await api.get("/class",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const turmasBack = response.data.classes;

    // Conversão de campos do backend para o frontend
    const turmas: Turma[] = turmasBack.map((t: any) => ({
      id: t.id,
      nome: t.name,
      idadeMin: t.minAge,
      idadeMax: t.maxAge,
      URLImage: t.icon_url
    }));
    console.log(turmas)

    return turmas;
  } catch (error) {
    console.error("Erro ao listar turmas:", error);
    return false;
  }
}

export async function FiltrarTurmaPorIdade(age: number ) {
  //Variáveis
  const turmas = await listarTurmas();
  const turmaFiltradas: Turma[]= [];

  if(turmas===false){
    return 'Erro ao carregar turmas. Tente novamente.';
  } 
  
  for(const turma of turmas){
    //Verifica se o aluno stende aos requisitos de faixa etária
    if((turma.idadeMax>=age)&&(age>=turma.idadeMin)){
      turmaFiltradas.push(turma)
    }
  }
  

  return turmaFiltradas;
}
