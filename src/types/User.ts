import type { Class } from "./Class";
import type { Student } from "./Student";

//Interface de aluno
export type Coach = {
    id: string;
    ResponsibleClasses?: Class[];
    student: Student;
}

export type notification = {
    date: string,
    category: string,
    description: string,
    read: boolean
}