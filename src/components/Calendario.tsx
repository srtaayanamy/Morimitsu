import { useState } from "react";
import type { event } from "../types/event";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
  isSameDay,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import SectionCard from "../components/SectionCard";
import { useEffect } from "react";
import { editEvent } from "../HTTP/Event/editEvent";

type Props = {
  events?: event[];
  editando?: boolean;
  onDeleteEvent?: (eventId: string) => void;
};

export default function Calendario({
  events = [],
  editando = false,
  onDeleteEvent,
}: Props) {
  const [eventosEditados, setEventosEditados] = useState<Record<string, any>>(
    {}
  );
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  // Filtra somente eventos do mês sendo exibido
  const monthEvents = events.filter((e) => {
    const d = new Date(e.event_date);
    return (
      d.getMonth() === currentDate.getMonth() &&
      d.getFullYear() === currentDate.getFullYear()
    );
  });

  const updateEvento = (id: string, field: string, value: any) => {
    setEventosEditados((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    if (!editando) {
      Object.entries(eventosEditados).forEach(([id, data]) => {
        editEvent({ id, ...data });
      });

      setEventosEditados({});
    }
  }, [editando]);

  return (
    <SectionCard>
      <div className="flex flex-col h-auto lg:flex-row justify-between pr-0 lg:pr-3 gap-6">
        {/* Lista lateral */}
        <div className="space-y-4 sm:min-w-[260px]">
          <h3 className="text-md font-bold text-red-900">
            Eventos/datas importantes:
          </h3>

          {monthEvents.length === 0 && (
            <div className="text-sm text-gray-500 italic">
              Nenhum evento cadastrado neste mês.
            </div>
          )}

          {monthEvents.length > 0 && (
            <div className="space-y-4">
              {monthEvents.map((e) => {
                const date = new Date(e.event_date);
                const edited = eventosEditados[e.id] || {};

                return (
                  <div
                    key={e.id}
                    className="md:flex flex-col md:w-100 items-start justify-between gap-4 rounded-lg border border-gray-200 bg-white p-2 hover:shadow-sm transition"
                  >
                    <div className="flex flex-col gap-3 w-full">
                      {/* DIA date picker */}
                      {editando ? (
                        <input
                          type="date"
                          value={
                            edited.event_date
                              ? edited.event_date.slice(0, 10)
                              : format(date, "yyyy-MM-dd")
                          }
                          onChange={(ev) =>
                            updateEvento(e.id, "event_date", ev.target.value)
                          }
                          className="rounded-md w-65 md:w-full border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-red-900 focus:ring-1 focus:ring-red-200 outline-none"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                          {format(date, "d")}
                        </div>
                      )}

                      {/* TEXTO */}
                      <div className="flex flex-col gap-3 text-sm w-full">
                        {/* Nome */}
                        {editando ? (
                          <input
                            type="text"
                            defaultValue={e.title}
                            onChange={(ev) =>
                              updateEvento(e.id, "title", ev.target.value)
                            }
                            className="w-65 md:w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 focus:border-red-900 focus:ring-1 focus:ring-red-200 outline-none"
                            placeholder="Nome do evento"
                          />
                        ) : (
                          <p className="font-medium text-gray-900">
                            {e.title}
                            {e.class?.name && (
                              <span className="text-gray-600">
                                {" "}
                                ({e.class.name})
                              </span>
                            )}
                          </p>
                        )}

                        {/* Turma */}
                        {editando && (
                          <select
                            defaultValue={e.class?.id}
                            onChange={(ev) =>
                              updateEvento(e.id, "class_id", ev.target.value)
                            }
                            className="rounded-md border w-65 md:w-full border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-red-900 focus:ring-1 focus:ring-red-200 outline-none"
                          >
                            <option value="">Selecione a turma</option>
                            {events
                              ?.map((ev) => ev.class)
                              .filter(
                                (cls, index, self) =>
                                  cls &&
                                  self.findIndex((c) => c?.id === cls.id) ===
                                    index
                              )
                              .map((cls) => (
                                <option key={cls!.id} value={cls!.id}>
                                  {cls!.name}
                                </option>
                              ))}
                          </select>
                        )}
                      </div>
                    </div>

                    {/* DELETE */}
                    <div className="flex w-full justify-end pt-2">
                      {editando && (
                        <button
                          onClick={() => onDeleteEvent?.(e.id)}
                          className="mt-1 text-gray-400 hover:text-red-700 transition cursor-pointer"
                          title="Excluir evento"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Calendário */}
        <div className="flex-1 max-w-100">
          <div className="flex items-center justify-between mb-3 mt-5 text-sm sm:text-base">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-1 hover:bg-gray-200 rounded transition"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <h3 className="text-base sm:text-lg font-semibold">
              {format(currentDate, "MMMM - yyyy", { locale: ptBR })}
            </h3>

            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-1 hover:bg-gray-200 rounded transition"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Dias da semana */}
          <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-2">
            {weekDays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Grade do calendário */}
          <div className="grid grid-cols-7 text-center text-sm">
            {days.map((day, idx) => {
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isCurrentDay = isToday(day);

              // Verifica se existe evento nesse dia
              const dayEvents = monthEvents.filter((ev) =>
                isSameDay(new Date(ev.event_date), day)
              );

              return (
                <div
                  key={idx}
                  className={`relative h-12 sm:h-14 flex items-center justify-center border border-gray-200 hover:bg-gray-100 cursor-pointer transition-all ${
                    !isCurrentMonth ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  <span className="relative z-10 font-medium">
                    {format(day, "d")}
                  </span>

                  {/* Marcador de HOJE */}
                  {isCurrentDay && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#337bf79e]"></div>
                    </div>
                  )}

                  {/* Marcador de EVENTO */}
                  {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-600 rounded-full"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
