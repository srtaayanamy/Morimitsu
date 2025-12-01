import { X, AlertCircle } from "lucide-react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Fundo escuro */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-none z-40"
        onClick={onClose}
      ></div>

      {/* Modal no canto superior direito */}
      <div
        className="fixed top-20 right-6 w-[90%] max-w-[420px] 
        bg-white rounded-2xl shadow-xl z-50 p-6"
      >
        <h2 className="text-xl text-black font-semibold mb-4">Notificações:</h2>

        <div className="flex flex-col gap-3">
          {[1].map((n) => (
            <div
              key={n}
              className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl"
            >
              <AlertCircle className="text-black w-5 h-5" />
              {/* conteudo da not */}
              <div className="w-full h-3 bg-gray-300 rounded-full opacity-70" />
            </div>
          ))}
        </div>

        <button
          className="absolute top-4 right-4 text-gray-700 hover:text-black"
          onClick={onClose}
        >
          <X className="w-6 h-6 cursor-pointer" />
        </button>
      </div>
    </>
  );
}
