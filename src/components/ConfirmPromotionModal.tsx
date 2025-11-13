// components/ConfirmPromotionModal.tsx
interface ConfirmPromotionModalProps {
  isOpen: boolean;
  alunoNome: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmPromotionModal({
  isOpen,
  alunoNome,
  onClose,
  onConfirm,
}: ConfirmPromotionModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 w-[420px] h-[300px] shadow-2xl shadow-gray-600 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-medium text-[#1E1E1E] leading-snug">
          Confirma a atribuição do cargo de professor para o aluno{" "}
          <span className="font-bold">“{alunoNome}”</span>?
        </h2>

        <div className="flex gap-2 justify-end">
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
            Sim, confirmo.
          </button>
        </div>
      </div>
    </div>
  );
}