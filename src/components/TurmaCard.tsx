import { useNavigate } from "react-router-dom";

interface TurmaCardProps {
  id: string;
  nome: string;
  imagem?: string;
}

export default function TurmaCard({ id, nome, imagem }: TurmaCardProps) { 
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/turma/${id}`)}
      className="w-36 sm:w-44 h-35 sm:h-35 bg-[#7F1A17] rounded-xl flex flex-col items-center justify-center
                 text-white font-semibold cursor-pointer hover:opacity-10 transition text-center px-2"
    >
      {imagem ? (
        <img
        src={imagem}
        alt={`Turma ${nome}`}
        className="w-15 h-15 sm:w-20 sm:h-20 object-contain"
        />
      ) : (
        <div className="w-10 h-10" > N/A </div>
      )}
      <span className="text-sm sm:text-base">{nome}</span>
    </div>
  );
}