import type { Class } from "./Class"

export type event = {
    id: string,
    title: string,
    event_date: string,
    class: Partial<Class>
}