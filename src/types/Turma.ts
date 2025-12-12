import { type Aluno } from "./Aluno";
import type { Professor } from "./User";

//Interface de turma
export type Turma= {
    id: string;
    nome: string;
    idadeMin: number;
    idadeMax: number;
    horarioInicio?: string;
    horarioFim?: string;
    URLImage?: string;
    alunos?: Aluno[]; 
    professores?: Professor[];
    numAlunos?: number
}