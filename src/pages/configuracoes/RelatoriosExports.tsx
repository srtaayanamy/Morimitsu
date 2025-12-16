import { useEffect, useState } from "react";
import Logo from "../../assets/Logo.png";
import { getReportsAndExports } from "../../HTTP/User/reportsAndExports";

export default function RelatoriosExports() {

  const [relatorio, setRelatorio] = useState<any>({});
  const [error, setError] = useState<string>()

  useEffect(() =>{
    const fetchRelatoriosAndExports = async () =>{
      const result = await getReportsAndExports();

      if(typeof result === "string"){
        setError(result);
        return;
      }else{
        setRelatorio(result);
        console.log("Result voltado da função: ", result)
        return;
      }
    }

    fetchRelatoriosAndExports()
  }, [])


  return (
    <div className="p-4 text-gray-700 w-full">
      <h2 className="font-semibold text-xl mb-6">Relatórios e exports</h2>

      <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center gap-8">
        
        {/* LOGO */}
        <div className="w-40 h-40 rounded-2xl bg-[#F1F1F1] flex items-center justify-center overflow-hidden">
          <img
            src={Logo}
            alt="Logo do projeto"
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Professor responsável */}
        <div className="w-full text-center">
          <p className="font-medium mb-2 text-gray-800">Professor responsável</p>
          <div className="bg-[#F1F1F1] rounded-xl py-3 text-gray-500 font-medium">
            <span className="text-gray-600 text-lg font-medium">{relatorio.mainAdmin}</span>
          </div>
        </div>

        {/* CARDS DE MÉTRICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
          <div className="bg-[#F1F1F1] p-4 rounded-xl text-center shadow-sm">
            <p className="font-semibold text-gray-800">Total de alunos</p>
            <span className="text-gray-600 text-lg font-medium">{relatorio.totalStudents}</span>
          </div>

          <div className="bg-[#F1F1F1] p-4 rounded-xl text-center shadow-sm">
            <p className="font-semibold text-gray-800">Total de turmas</p>
            <span className="text-gray-600 text-lg font-medium">{relatorio.totalClasses}</span>
          </div>

          <div className="bg-[#F1F1F1] p-4 rounded-xl text-center shadow-sm">
            <p className="font-semibold text-gray-800">Total de professores</p>
            <span className="text-gray-600 text-lg font-medium">{relatorio.totalCoaches}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
