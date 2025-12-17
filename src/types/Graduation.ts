import type { Student } from "./Student";

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
    student: Partial<Student>
}

export type NextGraduantionStudent ={
    id: string,
    studentId: string,
    name: string,
    from_rank: string,
    from_rating: number,
    to_rating: number,
    to_rank: string
}