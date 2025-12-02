import { X, ChevronDown } from "lucide-react";

interface FilterOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: () => void;
}

export default function FilterOverlay({ isOpen, onClose, onApply }: FilterOverlayProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Fundo escuro */}
      <div
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />

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

          {/* Faixa e grau */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-black">Faixa e grau:</span>
            <button className="w-36 bg-gray-100 px-3 py-2 rounded-lg flex items-center justify-between">
              <span className="text-gray-500">Selecione</span>
              <ChevronDown className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Turma */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-black">Turma:</span>
            <button className="w-36 bg-gray-100 px-3 py-2 rounded-lg flex items-center justify-between">
              <span className="text-gray-500">Selecione</span>
              <ChevronDown className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Aniversariantes */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-black">Aniversariantes:</span>
            <button className="w-36 bg-gray-100 px-3 py-2 rounded-lg flex items-center justify-between">
              <span className="text-gray-500">Selecione</span>
              <ChevronDown className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Faixa etária */}
          <div className="flex items-center justify-between">
            <span className="font-medium text-black">Faixa etária:</span>

            <div className="flex gap-2">
              <input
                type="number"
                min={0}
                placeholder="min"
                className="w-20 bg-gray-100 px-2 py-2 rounded-lg text-sm outline-none text-black"
              />
              <input
                type="number"
                min={0}
                placeholder="max"
                className="w-20 bg-gray-100 px-2 py-2 rounded-lg text-sm outline-none text-black"
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#3F3F3F] text-white font-medium"
          >
            Cancelar
          </button>

          <button
            onClick={onApply}
            className="px-4 py-2 rounded-lg bg-[#8A1C1C] text-white font-medium"
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
