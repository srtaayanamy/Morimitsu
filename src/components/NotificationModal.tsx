import { X, AlertCircle } from "lucide-react";

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
      {/* FUNDO */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className="fixed top-20 right-4 w-[92%] max-w-[420px]
        bg-white rounded-2xl shadow-2xl z-50 p-5"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Notificações
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-black" />
          </button>
        </div>

        {/* CONTEÚDO */}
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          {/* SEM NOTIFICAÇÕES */}
          {isEmptyString && (
            <p className="text-sm text-gray-600 text-center py-6">
              {notifications}
            </p>
          )}

          {/* LISTA */}
          {isList &&
            notifications.map((notify: any, index: number) => (
              <div
                key={index}
                className={`flex gap-3 p-4 rounded-xl border
                ${
                  !notify.read
                    ? "bg-red-50 border-red-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <AlertCircle
                  className={`w-5 h-5 mt-1
                  ${
                    !notify.read ? "text-red-600" : "text-gray-500"
                  }`}
                />

                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {notify.category}
                  </p>

                  <p className="text-xs text-gray-600 mt-1">
                    {notify.description}
                  </p>

                  <p className="text-[11px] text-gray-400 mt-2">
                    {notify.date}
                  </p>
                </div>
              </div>
            ))}

          {/* CARREGANDO */}
          {!isEmptyString && !isList && (
            <p className="text-sm text-gray-500 text-center py-4">
              Carregando...
            </p>
          )}
        </div>
      </div>
    </>
  );
}
