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

    // Supondo que o backend retorna { classes: [...] }
    const turmasBack = response.data.classes || response.data;

    // Conversão de campos do backend -> frontend
    const turmas: Turma[] = turmasBack.map((t: any) => ({
      id: t.id,
      nome: t.name,
      idadeMin: t.minAge,
      idadeMax: t.maxAge,
      URLImage: t.iconURL
    }));

    return turmas;
  } catch (error) {
    console.error("Erro ao listar turmas:", error);
    return false;
  }
}
