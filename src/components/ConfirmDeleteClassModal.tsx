interface ConfirmDeleteClassModalProps {
  isOpen: boolean;
  turmaNome: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteClassModal({
  isOpen,
  turmaNome,
  onClose,
  onConfirm,
}: ConfirmDeleteClassModalProps) {
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
        <div>
          <h2 className="text-lg font-medium text-[#1E1E1E]">
            Deseja realmente <span className="font-bold">excluir</span> a turma{" "}
            <span className="font-bold">“{turmaNome}”</span>?
          </h2>

          <p className="text-md">
            <span className="text-[#911418]">obs: </span> a exclusão é de forma
            permanente e irreversível.
          </p>
        </div>

        <div className="flex gap-2 justify-end mt-4">
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
