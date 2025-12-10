interface ConfirmFrequenciaModalProps {
  isOpen: boolean;
  turmaNome: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmFrequenciaModal({
  isOpen,
  turmaNome,
  onClose,
  onConfirm,
}: ConfirmFrequenciaModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-[340px] md:w-[460px] md:h-[260px] h-[230px] shadow-2xl shadow-gray-600 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-[#1E1E1E] leading-snug">
          Salvar a frequência da turma{" "}
          <span className="font-bold">“{turmaNome}”</span> ?
        </h2>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#333434] text-white text-sm font-medium rounded-lg hover:bg-[#444444] transition cursor-pointer"
          >
            Não
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-[#7F1A17] text-white text-sm font-medium rounded-lg hover:bg-[#6b1513] transition cursor-pointer"
          >
            Sim, salvar.
          </button>
        </div>
      </div>
    </div>
  );
}
