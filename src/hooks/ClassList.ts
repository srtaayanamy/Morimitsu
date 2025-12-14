import api from "../services/api";
import { type Class } from "../types/Class";
import Cookies from "js-cookie";

export async function ClassList(): Promise<Class[] | false> {
  try {
    
    const token = Cookies.get('token');
    
    const response = await api.get("/class",{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const RetornedClasses = response.data.classes;

    // Conversão de campos do backend para o frontend
    const classes: Class[] = RetornedClasses.map((t: any) => ({
      id: t.id,
      name: t.name,
      MinAge: t.minAge,
      MaxAge: t.maxAge,
      URLImage: t.icon_url
    }));
    console.log(classes)

    return classes;
  } catch (error) {
    console.error("Erro ao listar turmas:", error);
    return false;
  }
}

export async function FiltrarTurmaPorIdade(age: number ) {
  //Variáveis
  const classes = await ClassList();
  const FiltredClasses: Class[]= [];

  if(classes===false){
    return 'Erro ao carregar turmas. Tente novamente.';
  } 
  
  for(const Class of classes){
    //Verifica se o aluno stende aos requisitos de faixa etária
    if((Class.MaxAge>=age)&&(age>=Class.MinAge)){
      FiltredClasses.push(Class)
    }
  }

  return FiltredClasses;
}
