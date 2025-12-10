import type { Turma } from "./Turma";

//Interface de aluno
export type Aluno = {
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
    frequenciaRequerida?: number;
    Responsavel?: string;
    telefoneResponsavel?: string;
    matricula?: string; 
    observacao?: string;
    turmas?: string[] | Turma[];
    userID?: string
}

export type StudentParams ={
    minAge?: number,
    maxAge?: number,
    CPF?: string,
    email?: string,
    Rank?: string,
    class?: string,
    Presence: number
}