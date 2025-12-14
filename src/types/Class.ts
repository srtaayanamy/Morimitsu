import { type Student } from "./Student";
import type { Coach } from "./User";

//Interface de turma
export type Class= {
    id: string;
    name: string;
    MinAge: number;
    MaxAge: number;
    startTime?: string;
    endTime?: string;
    URLImage?: string;
    students?: Student[]; 
    coachs?: Coach[];
    numStudents?: number
}