import { useState } from "react";
import { Plus, Clock, Image as ImageIcon, X } from "lucide-react";
import Header from "../components/Header";

export default function RegistrarTurma() {
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [showClockOverlay, setShowClockOverlay] = useState(false);

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000]">
      <Header />

      <main className="p-5 md:p-8 space-y-5">
        {/* Cabeçalho */}
        <div className="bg-white rounded-2xl p-6 flex items-center justify-between shadow-sm">
          <h1 className="text-2xl font-semibold text-[#1E1E1E]">
            Cadastro de turma
          </h1>

          <div className="flex gap-3">
            <button
              type="button"
              className="bg-[#1E1E1E] text-white px-6 py-2 rounded-xl font-medium hover:opacity-90 transition"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="bg-[#8B0000] text-white px-6 py-2 rounded-xl font-medium hover:opacity-90 transition"
            >
              Concluir cadastro
            </button>
          </div>
        </div>

        {/* Bloco principal */}
        <div className="bg-white rounded-2xl p-8 space-y-6 shadow-sm">
          {/* Linha superior */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Imagem / Capa */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => setShowImageOverlay(true)}
                className="w-36 h-36 bg-[#E8E8E8] rounded-full flex items-center justify-center border border-[#D9D9D9] hover:bg-[#dcdcdc] transition"
              >
                <ImageIcon className="w-9 h-9 text-gray-600" />
              </button>
            </div>

            {/* Campos principais */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-5">
              {/* Nome da turma */}
              <div className="md:col-span-4">
                <label className="block text-sm font-semibold mb-2">
                  Nome da Turma:
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              {/* Professor */}
              <div className="col-span-2 relative">
                <label className="block text-sm font-semibold mb-2">
                  Vincular professor à turma:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder=""
                    className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                  <Plus className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black cursor-pointer" />
                </div>
              </div>

              {/* Idades */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Idade mínima:
                </label>
                <input
                  type="number"
                  placeholder=""
                  className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Idade máxima:
                </label>
                <input
                  type="number"
                  placeholder=""
                  className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>
            </div>
          </div>

          {/* Linha inferior - horários */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Horário de início:
              </label>
              <button
                onClick={() => setShowClockOverlay(true)}
                className="flex items-center justify-between w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-3 hover:bg-[#ebebeb] transition"
              >
                <span className="text-gray-600">00:00h</span>
                <Clock className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Horário de término:
              </label>
              <button
                onClick={() => setShowClockOverlay(true)}
                className="flex items-center justify-between w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-3 hover:bg-[#ebebeb] transition"
              >
                <span className="text-gray-600">00:00h</span>
                <Clock className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Overlay da imagem */}
      {showImageOverlay && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-80 text-center shadow-lg relative">
            <button
              onClick={() => setShowImageOverlay(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <ImageIcon className="w-10 h-10 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-700 font-medium">
              seletor de imagem futuramente
            </p>
          </div>
        </div>
      )}

      {/* Overlay do relógio */}
      {showClockOverlay && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-80 text-center shadow-lg relative">
            <button
              onClick={() => setShowClockOverlay(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <Clock className="w-10 h-10 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-700 font-medium">
              seletor de horário futuramente
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
