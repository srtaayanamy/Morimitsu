import type { Turma } from "./Turma"

export type event = {
    id: string,
    title: string,
    event_date: string,
    class: Partial<Turma>
}