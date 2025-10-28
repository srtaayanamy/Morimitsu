import { type Aluno } from "./Aluno";
import type { Professor } from "./Professor";
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
    professores: Professor[];
    numAlunos?: number
}