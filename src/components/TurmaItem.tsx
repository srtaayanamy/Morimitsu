import { useNavigate } from "react-router-dom";

interface TurmaItemProps {
  id: string;
  nome: string;
  idadeMin: number;
  idadeMax: number;
  icone?: string; // caminho para imagem
}

export default function TurmaItem({ id, nome, idadeMin, idadeMax, icone }: TurmaItemProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/turma/${id}`)}
      className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition"
    >
      {/* Ícone da turma */}
      <div className="bg-[#7B0000] rounded-xl flex flex-col items-center justify-center px-4 py-6 w-24 h-24 text-white font-semibold">
        {icone ? (
          <img src={icone} alt={nome} className="w-12 h-12 mb-2" />
        ) : (
          <div className="w-10 h-10 mb-2 bg-white/20 rounded-md" />
        )}
        <p className="text-sm">{nome.split(" ")[1] || nome}</p>
      </div>

      {/* Informações */}
      <div className="flex flex-col justify-center">
        <p className="font-semibold text-lg text-[#1E1E1E]">{nome}</p>
        <p className="text-sm text-gray-500">
          {idadeMax ? `${idadeMin} a ${idadeMax} anos` : `> ${idadeMin} anos`}
        </p>
      </div>
    </div>
  );
}
