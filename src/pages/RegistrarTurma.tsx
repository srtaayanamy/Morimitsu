import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Clock, Image as ImageIcon } from "lucide-react";
import Header from "../components/Header";
import ImageOverlay from "../components/ImageOverlay";
import ClockOverlay from "../components/ClockOverlay";
import { cadastrarTurma } from "../utils/CadastrarTurma";
import { ErrorMessage } from "../components/ErrorMessage";
import PageTitle from "../components/PageTitle";

export default function RegistrarTurma() {
  // Estados de exibição de overlays
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [showClockOverlay, setShowClockOverlay] = useState<
    "inicio" | "fim" | null
  >(null);

  // Estados principais
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [inicio, setInicio] = useState("00:00h");
  const [fim, setFim] = useState("00:00h");
  const [imagem, setImagem] = useState("");
  const [nome, setNome] = useState("");
  const [idadeMin, setIdadeMin] = useState(0);
  const [idadeMax, setIdadeMax] = useState(0);
  const [error, setErro] = useState<string | boolean>(""); //pq em boolean?

  //Define a função de navegação
  const navigate = useNavigate();

  //Guarda a imagem selecionada
  useEffect(() => {
    if (selectedImage !== null) {
      setImagem(`/src/assets/presets/capaturma${selectedImage + 1}.png`);
    }
  }, [selectedImage]);

  async function RegisterTurma() {
    console.log(imagem);
    const result = await cadastrarTurma(
      nome,
      idadeMin,
      idadeMax,
      inicio,
      fim,
      imagem
    );

    if (result) {
      console.log("Cadastro feito");
      navigate("/inicio");
    } else if (result !== false) {
      console.log("Deu errado");
      setErro(result);
      return;
    } else {
      setErro("Preencha todos os campos obrigatórios.");
    }
  }

  // Função para confirmar o horário (chamada pelo overlay)
  const handleConfirmTime = (time: string) => {
    if (showClockOverlay === "inicio") setInicio(time);
    if (showClockOverlay === "fim") setFim(time);
    setShowClockOverlay(null);
  };

  // Componentes auxiliares
  const ActionButton = ({
    label,
    variant = "primary",
    className = "",
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    variant?: "primary" | "secondary";
  }) => {
    const baseStyle =
      "px-6 py-2 rounded-xl font-medium transition hover:opacity-90";
    const variants = {
      primary: "bg-[#7F1A17] text-white",
      secondary: "bg-[#1D1E1E] text-white",
    };

    return (
      <button
        className={`${baseStyle} ${variants[variant]} ${className}`}
        {...props}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000]">
      <Header />

      <main className="p-4 md:p-8 space-y-5">
        {/* Cabeçalho */}
        <PageTitle title="Cadastro de turma">
          {/* Botões desktop */}
          <div className="hidden md:flex gap-3">
            <ActionButton
              label="Cancelar"
              variant="secondary"
              onClick={() => navigate(-1)}
            />

            <ActionButton label="Concluir cadastro" onClick={RegisterTurma} />
          </div>
        </PageTitle>

        {/* Mensagem de erro */}
        {error && <ErrorMessage message={error} />}

        {/* Bloco principal */}
        <div className="bg-white rounded-2xl p-5 md:p-8 space-y-6 shadow-sm">
          {/* Imagem */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowImageOverlay(true)}
              className="w-24 h-24 md:w-36 md:h-36 bg-[#E8E8E8] rounded-full flex items-center justify-center border border-[#D9D9D9] hover:bg-[#dcdcdc] transition overflow-hidden"
            >
              {selectedImage !== null ? (
                <img
                  src={`/src/assets/presets/capaturma${selectedImage + 1}.png`}
                  alt="Capa da turma"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-7 h-7 md:w-9 md:h-9 text-gray-600" />
              )}
            </button>
          </div>

          {/* Campos */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Nome */}
            <div className="md:col-span-4">
              <label className="block text-sm font-semibold mb-2">
                Nome da Turma:
              </label>
              <input
                type="text"
                className="w-full bg-[#EFEFEF] border border-[#D9D9D9] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            {/* Professor */}
            <div className="w-full md:col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Vincular professor à turma:
              </label>
              <div className="flex items-center relative">
                <select
                  className="w-full bg-[#EFEFEF] border border-[#D9D9D9] rounded-xl p-3 pr-10 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#8B0000] appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione um professor
                  </option>
                </select>
                <Plus className="absolute right-3 pointer-events-none w-5 h-5 text-black" />
              </div>
            </div>

            {/* Idades */}
            {["mínima", "máxima"].map((tipo) => (
              <div key={tipo}>
                <label className="block text-sm font-semibold mb-2">
                  Idade {tipo}:
                </label>
                {tipo === "mínima" ? (
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-[#EFEFEF] border border-[#D9D9D9] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    onChange={(e) => setIdadeMin(Number(e.target.value))}
                  />
                ) : (
                  <input
                    type="number"
                    min="0"
                    className="w-full bg-[#EFEFEF] border border-[#D9D9D9] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    onChange={(e) => setIdadeMax(Number(e.target.value))}
                  />
                )}
              </div>
            ))}

            {/* Horários */}
            {[
              { label: "Horário de início:", value: inicio, type: "inicio" },
              { label: "Horário de término:", value: fim, type: "fim" },
            ].map(({ label, value, type }) => (
              <div key={type}>
                <label className="block text-sm font-semibold mb-2">
                  {label}
                </label>
                <button
                  onClick={() => setShowClockOverlay(type as "inicio" | "fim")}
                  className="flex items-center justify-between w-full bg-[#EFEFEF] border border-[#D9D9D9] rounded-xl p-3 hover:bg-[#ebebeb] transition"
                >
                  <span className="text-gray-600">{value}</span>
                  <Clock className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            ))}
          </div>

          {/* Botões mobile */}
          <div className="flex justify-center gap-3 pt-4 md:hidden">
            <ActionButton
              label="Cancelar"
              variant="secondary"
              className="text-sm"
              onClick={() => navigate(-1)}
            />

            <ActionButton
              label="Concluir cadastro"
              className="text-sm"
              onClick={RegisterTurma}
            />
          </div>
        </div>
      </main>

      {/* Overlays */}
      {showImageOverlay && (
        <ImageOverlay
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          onClose={() => setShowImageOverlay(false)}
        />
      )}

      {showClockOverlay && (
        <ClockOverlay
          onConfirm={handleConfirmTime}
          onClose={() => setShowClockOverlay(null)}
        />
      )}
    </div>
  );
}
