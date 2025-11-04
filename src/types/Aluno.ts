import type { Turma } from "./Turma";

//Interface de aluno
export interface Aluno{
    id?: string;
    nome: string;
    apelido?: string;
    email:string;
    dataNascimento: string;
    idade?: number;
    telefone: string;
    sexo: string;
    CPF: string;
    faixa: string;
    grau?: number;
    frequencia: number;
    Responsavel?: string;
    telefoneResponsavel?: string;
    matricula?: string; 
    observacao?: string;
    turmas?: Turma[];
}