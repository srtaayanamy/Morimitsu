//Interface de aluno
export interface Professor{
    id?: string;
    nome: string;
    apelido?: string;
    email:string;
    senha: string;
    dataNascimento: string;
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
    turmas?: string[];
}