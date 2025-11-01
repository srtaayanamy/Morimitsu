import { SquarePen } from "lucide-react";
import martialIcon from "../../assets/presets/martial-arts.png";
import { useAuth } from "../../hooks/Autenticao";
import { useEffect, useState } from "react";
import { pegaDadosUser } from "../../utils/getDadosUser";
import { editaUser } from "../../utils/editarUser";
import { ErrorMessage } from "../../components/ErrorMessage"; // ← importe o componente de erro

export default function Perfil() {
  const auth = useAuth();

  // Estados
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Carrega dados do usuário
  useEffect(() => {
    const fetchUser = async () => {
      const result = await pegaDadosUser();

      if (typeof result === "string") {
        setError("Erro ao carregar dados do usuário.");
      } else {
        setNome(result.name);
        setEmail(result.email);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    console.log("Sessão encerrada");
    auth.logout();
  };

  const handleEdit = async () => {
    setLoading(true);
    setError(false);
    setSuccess(false);

    const result = await editaUser({ name: nome });

    if (result === true) {
      console.log("Edição feita com sucesso.");
      setSuccess(true);
    } else if (typeof result === "string") {
      console.log(result);
      setError(result);
    } else {
      console.log("Nenhuma mudança detectada.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#F1F1F1] p-5 md:p-6 rounded-2xl shadow-sm border border-gray-300 text-[#1C1C1C] relative">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[20px] font-semibold">Perfil do Usuário</h2>
        <button
          onClick={handleEdit}
          className={`text-[#1C1C1C] hover:text-[#8C0003] transition cursor-pointer disabled:opacity-50`}
          title="Salvar alterações"
          disabled={loading}
        >
          <SquarePen size={28} />
        </button>
      </div>

      {/* Container principal */}
      <div className="bg-white rounded-xl p-4 flex flex-col sm:flex-row gap-6 items-start">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-md bg-gray-200 flex items-center justify-center">
          <img
            src={martialIcon}
            alt="Ícone do usuário"
            className="w-28 h-28 object-contain"
          />
        </div>

        {/* Dados do usuário */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Mensagem de erro */}
          <ErrorMessage message={error} />

          {/* E-mail */}
          <div>
            <p className="text-[15px] font-medium mb-1">Acesso de Usuário:</p>
            <div className="bg-[#EFEFEF] rounded-md px-3 py-2 text-[14px] text-gray-800">
              {email}
            </div>
          </div>

          {/* Nome */}
          <div>
            <p className="text-[15px] font-medium mb-1">Dono do acesso:</p>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="bg-[#EFEFEF] rounded-md px-3 py-2 text-[14px] text-gray-800 w-full outline-none"
            />
          </div>

          {/* Mensagem de sucesso */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-sm">
              ✅ Perfil atualizado com sucesso!
            </div>
          )}
        </div>
      </div>

      {/* Botão de logout */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-[#7F1A17] text-white px-4 py-2 rounded-md text-[14px] font-medium hover:bg-[#a60005] transition cursor-pointer"
        >
          Encerrar sessão da conta
        </button>
      </div>
    </div>
  );
}
