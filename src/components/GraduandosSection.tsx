import React from "react";
import { Link } from "react-router-dom";
import BeltTag from "./BeltTag";
import { Avatar } from "./Avatar";
import SectionCard from "./SectionCard";

interface Graduando {
  id: string;
  nome: string;
  apelido: string;
  faixaAtual: string;
  grauAtual: number;
  proximaFaixa: string;
  proximoGrau: number;
}

interface GraduandosSectionProps {
  title: string;
  loading: boolean;
  error: string | null;
  graduandos: Graduando[];
}

const GraduandosSection: React.FC<GraduandosSectionProps> = ({
  title,
  loading,
  error,
  graduandos,
}) => {
  return (
    <SectionCard title={title}>
      {/* MOBILE */}
      <div className="md:hidden space-y-3">
        {loading && <div>Carregando...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && graduandos.length === 0 && (
          <div>Nenhum graduando encontrado.</div>
        )}

        {!loading &&
          !error &&
          graduandos.map((g) => (
            <div
              key={g.id}
              className="bg-[#F1F1F1] shadow-sm rounded-xl p-3 flex items-center gap-3"
            >
              {/* Nome + Turma */}
              <div className="flex-1 min-w-0">
                <Link
                  to={`/visualizar-aluno/${g.id}`}
                  className="font-semibold text-[#1E1E1E] text-sm block leading-tight"
                >
                  {g.nome}
                </Link>
              </div>

              {/* Faixas */}
              <div className="bg-white rounded-xl px-3 py-2 shadow-sm flex items-center gap-2">
                {/* Faixa atual */}
                <div className="flex flex-col items-center">
                  <BeltTag faixa={g.faixaAtual} grau={g.grauAtual} />
                  <span className="text-[0.65rem] font-semibold mt-0.5">
                    {g.faixaAtual} {g.grauAtual}°
                  </span>
                </div>

                {/* Seta */}
                <span className="text-gray-400 text-lg leading-none">→</span>

                {/* Próxima faixa */}
                <div className="flex flex-col items-center">
                  <BeltTag faixa={g.proximaFaixa} grau={g.proximoGrau} />
                  <span className="text-[0.65rem] font-semibold mt-0.5">
                    {g.proximaFaixa} {g.proximoGrau}°
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* DESKTOP */}
      <div className="bg-white rounded-2xl shadow-md p-4 overflow-x-auto hidden md:block">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="py-3 px-6 font-semibold text-[#1E1E1E]">Nome</th>
              <th className="py-3 px-6 font-semibold text-[#1E1E1E] text-center">
                Faixa atual
              </th>
              <th className="py-3 px-6 font-semibold text-[#1E1E1E] text-center">
                Próxima faixa
              </th>
            </tr>
          </thead>

          <tbody>
            {graduandos.map((g) => (
              <tr
                key={g.id}
                className="bg-[#FFFFFF] shadow-sm rounded-xl hover:bg-gray-50 transition"
              >
                <td className="py-3 px-6 font-medium">{g.nome}</td>
                <td className="py-3 px-6 text-center">
                  <BeltTag faixa={g.faixaAtual} grau={g.grauAtual} />
                </td>
                <td className="py-3 px-6 text-center">
                  <BeltTag faixa={g.proximaFaixa} grau={g.proximoGrau} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};

export default GraduandosSection;
