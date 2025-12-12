import type { Aluno } from "./Aluno";

export type Graduation ={
    id: string;
    rank: string;
    needed_frequency:number;
}

export type graduationRegister = {
    id: string,
    date: string,
    beforePromotion: string,
    afterPromotion: string,
    student: Partial<Aluno>
}