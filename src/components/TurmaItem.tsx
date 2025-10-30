import { useNavigate } from "react-router-dom";

interface TurmaItemProps {
  id: string;
  nome: string;
  idadeMin: number;
  idadeMax: number;
  imagem?: string;
}

export default function TurmaItem({ id, nome, idadeMin, idadeMax, imagem }: TurmaItemProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/visualizar-turma/${id}`)}
      className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition"
    >
      {/* Ícone da turma */}
      <div className="bg-[#7F1A17] rounded-xl flex flex-col items-center justify-center px-4 py-6 w-36 h-36 text-white font-semibold cursor-pointer hover:opacity-90 transition">
        {imagem ? (
          <img src={imagem} alt={nome} className="w-20 h-20 mb-2" />
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
