import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { ClassList } from "../hooks/ClassList";
import { useNavigate } from "react-router-dom";
import type { StudentParams } from "../types/Student";

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterOverlay({ isOpen, onClose }: FilterOverlayProps) {
  const [turmas, setTurmas] = useState<any[]>([]);

  const [selectedTurma, setSelectedTurma] = useState("");
  const [selectedMonth, setSelectedMonth] = useState<number | "">("");
  const [minAge, setMinAge] = useState<number | "">("");
  const [maxAge, setMaxAge] = useState<number | "">("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) carregarListas();
  }, [isOpen]);

  async function carregarListas() {
    const t = await ClassList();
    if (t && Array.isArray(t)) setTurmas(t);
  }

  function aplicarFiltros() {
    const filtros: StudentParams & { mes?: number } = {};

    if (selectedTurma) filtros.classid = selectedTurma;
    if (selectedMonth !== "") filtros.mes = selectedMonth;
    if (minAge !== "") filtros.minAge = minAge;
    if (maxAge !== "") filtros.maxAge = maxAge;

    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });

    navigate(`/resultado-filtros?${params.toString()}`);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Fundo escuro */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Modal no canto superior direito */}
      <div
        className="
          fixed z-50
          top-[70px] right-6
          bg-white rounded-xl shadow-lg
          p-6 w-[350px] 
        "
      >
        {/* Título */}
        <h2 className="text-xl font-semibold text-black mb-5">
          Selecione os tipos de filtro:
        </h2>

        {/* Inputs */}
        <div className="flex flex-col gap-3 mb-6">

          {/* TURMA */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-black">Turma:</span>

            <select
              value={selectedTurma}
              onChange={(e) => setSelectedTurma(e.target.value)}
              className="w-36 bg-gray-100 px-1 py-2 rounded-lg text-gray-500 outline-none"
            >
              <option value="">Selecione</option>
              {turmas.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* MÊS */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-black">Mês:</span>

            <select
              value={selectedMonth}
              onChange={(e) =>
                setSelectedMonth(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              className="w-36 bg-gray-100 px-1 py-2 rounded-lg text-gray-500 outline-none"
            >
              <option value="">Selecione</option>
              <option value={0}>Janeiro</option>
              <option value={1}>Fevereiro</option>
              <option value={2}>Março</option>
              <option value={3}>Abril</option>
              <option value={4}>Maio</option>
              <option value={5}>Junho</option>
              <option value={6}>Julho</option>
              <option value={7}>Agosto</option>
              <option value={8}>Setembro</option>
              <option value={9}>Outubro</option>
              <option value={10}>Novembro</option>
              <option value={11}>Dezembro</option>
            </select>
          </div>

          {/* Faixa etária */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-black">Faixa etária:</span>

            <div className="flex gap-2">
              <input
                type="number"
                min={0}
                placeholder="min"
                value={minAge}
                onChange={(e) =>
                  setMinAge(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-20 bg-gray-100 px-2 py-2 rounded-lg text-sm outline-none text-black"
              />
              <input
                type="number"
                min={0}
                placeholder="max"
                value={maxAge}
                onChange={(e) =>
                  setMaxAge(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="w-20 bg-gray-100 px-2 py-2 rounded-lg text-sm outline-none text-black"
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#333434] text-white font-medium cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={aplicarFiltros}
            className="px-4 py-2 rounded-lg bg-[#7F1A17] text-white font-medium cursor-pointer"
          >
            Aplicar
          </button>
        </div>

        {/* Botão X */}
        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-black"
          onClick={onClose}
        >
          <X className="w-5 h-5 cursor-pointer" />
        </button>
      </div>
    </>
  );
}
