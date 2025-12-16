interface GraduateStudentModalProps {
  isOpen: boolean;
  studentName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function GraduateStudentModal({
  isOpen,
  studentName,
  onCancel,
  onConfirm,
}: GraduateStudentModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-2xl p-8 w-[340px] md:w-[460px] md:h-[280px] h-[260px] shadow-2xl shadow-gray-600 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-[#1E1E1E] leading-snug">
            Deseja realmente graduar o aluno{" "}
            <span className="font-bold">“{studentName}”</span>?
          </h2>

          <p className="text-sm text-[#7F1A17] font-medium">
            obs: Graduando o aluno, sua frequência retornará a zero, pois ele está
            apto a subir de faixa/grau.
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
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
