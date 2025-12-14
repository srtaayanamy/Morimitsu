import api from "../services/api";
import { type Coach } from "../types/User";
import Cookies from "js-cookie";

export async function CoachList(): Promise<Coach[] | false | string> {
  try {
    
    const token = Cookies.get('token');
    
    const response = await api.get("/user/all?role=USER",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    
    const CoachsRetorned = response.data.body.users;
    console.log(CoachsRetorned)

    if(CoachsRetorned.length === 0){
      return 'Nenhum professor encontrado.';
    };

    // Conversão de campos do backend para o frontend
    const coachs: Coach[] = CoachsRetorned.map((p: any) => ({
      id: p.id,
      student:{
        id: p.studentData.student.id,
        personal:{
          name: p.studentData.student.name,
          nickName: p.studentData.student.nickname,
          email: p.email,
          CPF: p.studentData.student.CPF
        },
        form:{
          rank: p.studentData.Rank,
          rating: p.studentData.Rating
        }
      }
    }));
    console.log(coachs)

    return coachs;

  } catch (error) {

    console.error("Erro ao listar professores:", error);
    return false;
  }
}
