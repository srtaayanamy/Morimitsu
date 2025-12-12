//Interface de aluno
export type Professor = {
    id: string;
    studentId: string;
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

export type notification = {
    date: string,
    category: string,
    description: string,
    read: boolean
}