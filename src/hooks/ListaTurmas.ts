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
    console.log(response.data)
    
    if(response.status=== 200){
      console.log('Turmas listadas com sucesso')
      console.log(response.data.classes)
      // Conversão de campos do backend para o frontend
      const turmasBack = response.data.classes;
      const turmas: Turma[] = turmasBack.map((t: any) => ({
        id: t.id,
        nome: t.name,
        idadeMin: t.minAge,
        idadeMax: t.maxAge,
        URLImage: t.icon_url
      }));
      console.log(turmas)
      return turmas;
    } else {
      console.log(response.status)
      console.log('Erro interno no servidor.')
      return false
    }

    


    
  } catch (error) {
    console.error("Erro ao listar turmas:", error);
    return false;
  }
}
