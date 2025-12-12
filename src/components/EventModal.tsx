import { useState, useEffect } from "react";

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { nome: string; data: string; turma: string }) => void;
  turmas: { id: string; nome: string }[];
};

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  turmas,
}: EventModalProps) {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [turma, setTurma] = useState("");

  useEffect(() => {
    if (isOpen) {
      setNome("");
      setData("");
      setTurma("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-[#F1F1F1] w-full max-w-md rounded-2xl p-6 shadow-xl relative">
        
        <h2 className="text-xl font-semibold text-[#1E1E1E] mb-4">
          Criar novo evento:
        </h2>

        <label className="block text-sm mb-1">Nome do evento:</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl p-3 mb-4 outline-none"
          placeholder="Digite o nome"
        />

        <label className="block text-sm mb-1">Dia do evento:</label>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl p-3 mb-4"
        />

        <label className="block text-sm mb-1">Turma vinculada:</label>
        <select
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl p-3 mb-6"
        >
          <option value="">Selecione</option>
          {turmas?.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-[#3C3C3C] text-white px-4 py-2 rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={() => onSave({ nome, data, turma })}
            className="bg-[#8A1311] text-white px-4 py-2 rounded-lg"
          >
            Salvar alterações
          </button>
        </div>
      </div>
    </div>
  );
}
