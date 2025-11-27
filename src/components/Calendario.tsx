import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import SectionCard from "../components/SectionCard";

export default function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return (
    <SectionCard>
      <div className="flex flex-col h-auto lg:flex-row justify-between pr-3">
        {/* Lista lateral de eventos */}
        <div className="space-y-4 min-w-[260px]">
          <h3 className="text-md font-semibold text-red-800">
            Eventos/datas importantes:
          </h3>

          <div className="text-sm text-gray-500 italic">
            Nenhum evento cadastrado neste mês.
          </div>
        </div>

        {/* Calendário*/}
        <div className="flex-1 max-w-md">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              className="p-1 hover:bg-gray-200 rounded transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <h3 className="text-lg font-semibold">
              {format(currentDate, "MMMM - yyyy", { locale: ptBR })}
            </h3>

            <button
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              className="p-1 hover:bg-gray-200 rounded transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dias da semana */}
          <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-700 border-b border-gray-300 pb-2 mb-2">
            {weekDays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Grid dos dias*/}
          <div className="grid grid-cols-7 text-center text-sm">
            {days.map((day, idx) => {
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isCurrentDay = isToday(day);

              return (
                <div
                  key={idx}
                  className={`
                    relative h-12 flex items-center justify-center border border-gray-200
                    hover:bg-gray-100 cursor-pointer transition-all
                    ${!isCurrentMonth ? "text-gray-400" : "text-gray-900"}
                  `}
                >
                  <span className="relative z-10 font-medium">
                    {format(day, "d")}
                  </span>

                  {isCurrentDay && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-9 h-9 rounded-full bg-[#337AF7]"></div>
                    </div>
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