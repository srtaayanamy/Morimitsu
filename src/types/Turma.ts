import { type Aluno } from "./Aluno";
//Interface de turma
export interface Turma{
    id: string;
    nome: string;
    idadeMin: number;
    idadeMax: number;
    horarioInicio?: string;
    horarioFim?: string;
    URLImage?: string;
    alunos?: Aluno[]; 
}