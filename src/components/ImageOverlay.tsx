interface ImageOverlayProps {
  selectedImage: number | null;
  setSelectedImage: (index: number) => void;
  onClose: () => void;
}

export default function ImageOverlay({
  selectedImage,
  setSelectedImage,
  onClose,
}: ImageOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[95%] max-w-md text-center shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          Selecione uma foto para a capa da turma:
        </h2>

        <div className="grid grid-cols-4 gap-3 justify-items-center mb-6">
          {[...Array(8)].map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-20 rounded-full flex items-center justify-center overflow-hidden border ${
                selectedImage === index
                  ? "ring-4 ring-[#36A3F1]"
                  : "border-[#D9D9D9]"
              }`}
            >
              <img
                src={`/src/assets/presets/capaturma${index + 1}.png`}
                alt={`Imagem ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-6">
          <button
            onClick={onClose}
            className="text-gray-600 font-medium hover:opacity-80 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="text-[#7F1A17] font-semibold hover:opacity-80 transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
