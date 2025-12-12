import api from "../services/api";
import { type Professor } from "../types/User";

export async function listarProfessores(): Promise<Professor[] | false | string> {
  try {
    
    const token= localStorage.getItem('token');
    
    const response = await api.get("/user/all?role=USER",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    const ProfessoresBack = response.data.body.users;
    console.log(ProfessoresBack)

    if(ProfessoresBack.length === 0){
      return 'Nenhum professor encontrado.';
    };

    // Conversão de campos do backend para o frontend
    const professores: Professor[] = ProfessoresBack.map((p: any) => ({
      id: p.id,
      nome: p.name,
      apelido: p.studentData.nickname,
      email: p.email,
      studentId: p.studentData.student.id,
      faixa: p.studentData.Rank,
      grau: p.studentData.Rating
    }));
    console.log(professores)

    return professores;

  } catch (error) {

    console.error("Erro ao listar professores:", error);
    return false;
  }
}
