import { useState } from "react";
import type { event } from "../types/Event";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  isSameDay
} from "date-fns";
import { ptBR } from "date-fns/locale";
import SectionCard from "../components/SectionCard";

type Props = {
  events?: event[];
};

export default function Calendario({ events = [] }: Props) {
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

  return (
    <SectionCard>
      <div className="flex flex-col h-auto lg:flex-row justify-between pr-3">

        {/* Lista lateral */}
        <div className="space-y-4 min-w-[260px]">
          <h3 className="text-md font-semibold text-red-800">
            Eventos/datas importantes:
          </h3>

          {monthEvents.length === 0 && (
            <div className="text-sm text-gray-500 italic">
              Nenhum evento cadastrado neste mês.
            </div>
          )}

          {monthEvents.length > 0 && (
            <div className="space-y-2">
              {monthEvents.map((e) => (
                <div
                  key={e.id}
                  className="p-2 bg-white shadow rounded border border-gray-200"
                >
                  <p className="font-semibold">{e.title}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(e.event_date), "dd/MM/yyyy")}
                  </p>
                </div>
              ))}
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
