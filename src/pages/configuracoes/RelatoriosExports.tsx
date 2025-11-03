import Logo from "../../assets/Logo.png";

export default function RelatoriosExports() {
  return (
    <div className="p-4 text-gray-700 w-full">
      <h2 className="font-semibold text-xl mb-6">Relatórios e exports:</h2>

      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center gap-6">
        <img
          src={Logo}
          alt="Logo do projeto"
          className="w-36 h-36 rounded-xl object-contain bg-gray-100"
        />

        <div className="text-center w-full">
          {/* Professor responsável */}
          <p className="font-medium mb-1">Professor responsável:</p>
          <div className="bg-gray-100 rounded-lg py-2 text-gray-500">
            <span>—</span>
          </div>

          {/* Cards com números */}
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-medium">Total de alunos:</p>
              <span className="text-gray-500">—</span>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-medium">Total de turmas:</p>
              <span className="text-gray-500">—</span>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="font-medium">Total de professores:</p>
              <span className="text-gray-500">—</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
