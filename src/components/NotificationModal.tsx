import { X, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: any;
}

export default function NotificationModal({
  isOpen,
  onClose,
  notifications,
}: NotificationModalProps) {
  if (!isOpen) return null;

  const isEmptyString = typeof notifications === "string";
  const isList = Array.isArray(notifications);

  return (
    <>
      {/* Fundo escuro */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-none z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="fixed top-20 right-6 w-[90%] max-w-[420px] 
        bg-white rounded-2xl shadow-xl z-50 p-6"
      >
        <h2 className="text-xl text-black font-semibold mb-4">Notificações:</h2>

        <div className="flex flex-col gap-3">
          {/* String de "sem notificações" */}
          {isEmptyString && <p className="text-gray-700">{notifications}</p>}

          {/* Lista */}
          {isList &&
            notifications.map((notify: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl"
              >
                <AlertCircle className="text-black w-5 h-5" />
                <div>
                  <p className="text-sm font-medium text-black">
                    {notify.category}
                  </p>
                  <p className="text-xs text-gray-700">{notify.description}</p>
                  <p className="text-[10px] text-gray-500">{notify.date}</p>
                </div>
              </div>
            ))}

          {/* Caso ainda esteja undefined (bem rápido antes de carregar) */}
          {!isEmptyString && !isList && (
            <p className="text-gray-700">Carregando...</p>
          )}
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
