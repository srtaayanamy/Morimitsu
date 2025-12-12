import type { Aluno } from "./Aluno";
import type { Professor } from "./User";
import type { Turma } from "./Turma";

export type Frequencie = {
    Date: string,
    class: Turma,
    students: Partial<StudentFrequencie>[],
    teacher: Partial<Professor>
}

export type StudentFrequencie = {
    idFrequencie?: string,
    student: Partial<Aluno>
}