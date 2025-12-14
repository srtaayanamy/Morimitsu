import Logo from "../../assets/Logo.png";
import ManualADM from "../../assets/manuais/adm.pdf";
import ManualProf from "../../assets/manuais/prof.pdf";
import Cookies from "js-cookie";

export default function ManualUsuario() {
  const role = Cookies.get("role");

  // Seleciona PDF baseado no role
  const linkManual = role === "ADMIN" ? ManualADM : ManualProf;

  return (
    <div className="p-4 text-gray-700 w-full">
      <h2 className="font-semibold text-xl mb-6">Manual do Usuário</h2>

      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center gap-6">

        {/* Logo central */}
        <img
          src={Logo}
          alt="Logo do projeto"
          className="w-40 h-40 rounded-xl object-contain bg-gray-100"
        />

        {/* Área do link */}
        <div className="text-center w-full">
          <p className="font-medium mb-2">Link para download do PDF:</p>

          <div className="bg-gray-100 rounded-lg py-3 text-gray-700">
            <a
              href={linkManual}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#285269] hover:underline font-medium"
            >
              Baixe aqui
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
