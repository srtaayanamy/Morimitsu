import type { Student } from "./Student";
import type { Coach } from "./User";
import type { Class } from "./Class";

export type Frequencie = {
    Date: string,
    class: Class,
    students: Partial<StudentFrequencie>[],
    coach: Partial<Coach>
}

export type StudentFrequencie = {
    idFrequencie?: string,
    student: Partial<Student>
}