import api from "../services/api";
import type { Aluno } from "../types/Aluno";

export async function pegaDadosAluno(id: string) {
  try {
    const response = await api.get(`/student/${id}`);

<<<<<<< Updated upstream
    try{
        const response= await api.get(`/student/${id}`)
    
        //Verifica o status da requisição
        if(response.status=== 200){
            console.log("Aluno encontrado")
            //Guarda as informações retornadas em uma variável do tipo aluno
            const aluno: Aluno={
                nome:response.data.data.student.personal.name,
                apelido:response.data.data.student.nickname,
                dataNascimento:response.data.data.student.personal.birthDate,
                telefone:response.data.data.student.personal.contact,
                sexo: response.data.data.student.personal.sexo,
                CPF: response.data.data.student.personal.CPF,
                faixa:response.data.data.student.form.Rank,
                grau: response.data.data.student.form.Rating,
                frequencia: response.data.data.form.Presence,
                Responsavel: response.data.data.parents.parentName,
                telefoneResponsavel:response.data.data.parents.parentContact,
                matricula: response.data.data.form.studentId,
                email: response.data.data.student.email,
                observacao: response.data.data.form.Comments,
                turmas: response.data.data.student.classId,
                idade: response.data.data.student.personal.age
            }
            return aluno;
        } else if(response.status=== 404){
            console.log('Aluno não encontrada')
            return 'Aluno não encontrada';
        } else{
            console.log('Erro interno no servidor')
            return 'Erro ao carregar o aluno. Tente novamente!';
        }
    } catch(error){
        console.log('Erro: ', error);
        return 'Erro ao carregar o aluno. Tente novamente!';
    };
}
=======
    if (response.status === 200) {
      console.log("Aluno encontrado", response.data);

      const aluno: Aluno = {
        nome: response.data.data?.student?.personal?.name || "",
        apelido: response.data.data?.student?.nickname || "",
        dataNascimento: response.data.data?.student?.personal?.birthDate || "",
        telefone: response.data.data?.student?.personal?.contact || "",
        sexo: response.data.data?.student?.personal?.sexo || "",
        CPF: response.data.data?.student?.personal?.CPF || "",
        faixa: response.data.data?.student?.form?.Rank || "",
        grau: response.data.data?.student?.form?.Rating || "",
        frequencia: response.data.data?.form?.Presence || 0,
        Responsavel: response.data.data?.parents?.parentName || "",
        telefoneResponsavel: response.data.data?.parents?.parentContact || "",
        matricula: response.data.data?.form?.studentId || "",
        email: response.data.data?.student?.email || "",
        observacao: response.data.data?.form?.Comments || "",
        turmas: response.data.data?.student?.classId || [],
        idade: response.data.data?.student?.personal?.age || 0,
      };

      return aluno;
    } else if (response.status === 404) {
      return "Aluno não encontrado";
    } else {
      return "Erro ao carregar o aluno. Tente novamente!";
    }
  } catch (error) {
    console.error("Erro: ", error);
    return "Erro ao carregar o aluno. Tente novamente!";
  }
}
>>>>>>> Stashed changes
