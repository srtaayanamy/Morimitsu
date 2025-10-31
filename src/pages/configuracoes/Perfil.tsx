import { SquarePen } from "lucide-react";
import martialIcon from "../../assets/presets/martial-arts.png";
import { useAuth } from "../../hooks/Autenticao";
import { useEffect, useState } from "react";
import { pegaDadosUser } from "../../utils/getDadosUser";
import { editaUser } from "../../utils/editarUser";

export default function Perfil() {

  const auth = useAuth();

  //Variáveis de estado
  const [nome, setNome] =  useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] =  useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchUser = async () => {
        const result = await pegaDadosUser();
  
        if (typeof result === 'string') {
          setError("Erro ao carregar turmas.");
        } else {
          setNome(result.name)
          setEmail(result.email)
          setPassword(result.password)
        }
      };
  
      fetchUser();
    }, []);

  const handleLogout = () => {
    console.log("Sessão encerrada");
    auth.logout();
  };

  const handleEdit = async () =>{
    const result =  await editaUser({name:nome, password:password})

    if(result===true){
      console.log('Edição feita com sucesso.')
      return;
    } else if(typeof result=== 'string'){
      console.log(result)
      setError(result)
    } else{
      console.log('Nenhuma mudança.')
      return;
    }
  }

  return (
    <div className="bg-[#F1F1F1] p-5 md:p-6 rounded-2xl shadow-sm border border-gray-300 text-[#1C1C1C] relative">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[20px] font-semibold">Perfil do Usuário</h2>
        <button
          className="text-[#1C1C1C] hover:text-[#8C0003] transition 7F1A17 cursor-pointer"
          title="Editar perfil"
        >
          <SquarePen size={28} />
        </button>
      </div>

      {/* Container principal */}
      <div className="bg-[white] rounded-xl p-4 flex flex-col sm:flex-row gap-6 items-start">
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
          {/* E-mail */}
          <div>
            <p className="text-[15px] font-medium mb-1">Acesso de Usuário:</p>
            <div className="bg-[#EFEFEF] rounded-md px-3 py-2 text-[14px] text-gray-800">
              {/* usuario@exemplo.com */}
            </div>
          </div>

          {/* Nome */}
          <div>
            <p className="text-[15px] font-medium mb-1">Dono do acesso:</p>
            <div className="bg-[#EFEFEF] rounded-md px-3 py-2 text-[14px] text-gray-800">
              {/* Nome do Usuário */}
            </div>
          </div>

          {/* Senha */}
          <div>
            <p className="text-[15px] font-medium mb-1">Senha:</p>
            <div className="bg-[#EFEFEF] rounded-md px-3 py-2 text-[14px] text-gray-800 tracking-wide">
              {/* senha do usuário */}
            </div>
          </div>
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
