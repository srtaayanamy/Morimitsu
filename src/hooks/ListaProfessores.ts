import api from "../services/api";
import { type Professor } from "../types/Professor";

export async function listarProfessores(): Promise<Professor[] | false | string> {
  try {
    
    const token= localStorage.getItem('token');
    
    const response = await api.get("/user/all",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const ProfessoresBack = response.data.classes;

    if(ProfessoresBack === undefined){
      return 'Nenhum professor encontrado.';
    };

    // Conversão de campos do backend para o frontend
    const professores: Professor[] = ProfessoresBack.map((p: any) => ({
      id: p.id,
      nome: p.name,
      email: p.email,
      studentID:p.studentData.id
    }));

    console.log(professores)

    return professores;

  } catch (error) {

    console.error("Erro ao listar professores:", error);
    return false;
  }
}
