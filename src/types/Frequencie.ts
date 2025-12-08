import type { Aluno } from "./Aluno";
import type { Professor } from "./Professor";
import type { Turma } from "./Turma";

export type Frequencie = {
    Date: string,
    class: Turma,
    students: Aluno[],
    teacher: Professor
}