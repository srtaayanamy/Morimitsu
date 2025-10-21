import { useState } from "react";

interface ClockOverlayProps {
  onConfirm: (formatted: string) => void;
  onClose: () => void;
}

export default function ClockOverlay({
  onConfirm,
  onClose,
}: ClockOverlayProps) {
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  const confirmar = () => {
    const horario = `${hour.padStart(2, "0")}:${minute.padStart(
      2,
      "0"
    )} ${period}`;
    onConfirm(horario);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[95%] max-w-md text-center shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Defina um horário:</h2>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div>
            <input
              type="number"
              min="0"
              max="12"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-20 text-center border rounded-lg p-2 bg-red-100 font-medium text-lg focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Horas</p>
          </div>

          <span className="text-xl font-semibold">:</span>

          <div>
            <input
              type="number"
              min="0"
              max="59"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-20 text-center border rounded-lg p-2 bg-gray-100 font-medium text-lg focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Minutos</p>
          </div>

          <div className="flex flex-col ml-3">
            <button
              onClick={() => setPeriod("AM")}
              className={`text-xs font-semibold py-1 px-3 rounded ${
                period === "AM" ? "bg-gray-300" : "bg-gray-100"
              }`}
            >
              AM
            </button>
            <button
              onClick={() => setPeriod("PM")}
              className={`text-xs font-semibold py-1 px-3 rounded mt-1 ${
                period === "PM" ? "bg-gray-300" : "bg-gray-100"
              }`}
            >
              PM
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-6">
          <button
            onClick={onClose}
            className="text-gray-600 font-medium hover:opacity-80 transition"
          >
            Cancelar
          </button>
          <button
            onClick={confirmar}
            className="text-[#7F1A17] font-semibold hover:opacity-80 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
