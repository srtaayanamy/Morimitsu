import { Routes, Route } from "react-router-dom";
import Initial from "../pages/Initial";
import RecuperarSenha from "../pages/RecuperarSenha";
import ConfirmarEmail from "../pages/ConfirmarEmail";
import NovaSenha from "../pages/NovaSenha";
import TelaInicial from "../pages/TelaInicial";
import RegistrarTurma from "../pages/RegistrarTurma";
import Alunos from "../pages/Alunos";
import RegistrarAluno from "../pages/RegistrarAluno";
import Turmas from "../pages/Turmas";
import VisualizarAluno from "../pages/VisualizarAluno";
import VisualizarTurma from "../pages/VisualizarTurma";
import Professores from "../pages/Professores";
import Configuration from "../pages/Configuracoes";

// telas de configuração
import Perfil from "../pages/configuracoes/Perfil";
import RegistrosGraduacao from "../pages/configuracoes/RegistrosGraduacao";
import ConfigurarGraduacao from "../pages/configuracoes/ConfigurarGraduacao";
import RegistrosFrequencia from "../pages/configuracoes/RegistrosFrequencia";
import CorrigirFrequencia from "../pages/configuracoes/CorrigirFrequencia";
import RelatoriosExports from "../pages/configuracoes/RelatoriosExports";

export default function AppRoutes () {
  return (
    <Routes>
      <Route path="/" element={<Initial />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      <Route path="/confirmar-email" element={<ConfirmarEmail />} />
      <Route path="/nova-senha" element={<NovaSenha />} />
      <Route path="/inicio" element={<TelaInicial />} />
      <Route path="/registrar-turma" element={<RegistrarTurma />} />
      <Route path="/alunos" element={<Alunos />} />
      <Route path="/registrar-aluno" element={<RegistrarAluno />} />
      <Route path="/Turmas" element={<Turmas />} />
      <Route path="/visualizar-aluno/:id" element={<VisualizarAluno />} />
      <Route path="/visualizar-turma" element={<VisualizarTurma />} />
      <Route path="/professores" element={<Professores />} />
      
      {/* rotas pai/filho de configuração */}
      <Route path="/configuracoes" element={<Configuration />}>
        <Route path="perfil" element={<Perfil />} />
        <Route path="registros-graduacao" element={<RegistrosGraduacao />} />
        <Route path="configurar-graduacao" element={<ConfigurarGraduacao />} />
        <Route path="registros-frequencia" element={<RegistrosFrequencia />} />
        <Route path="corrigir-frequencia" element={<CorrigirFrequencia />} />
        <Route path="relatorios-exports" element={<RelatoriosExports />} />
      </Route>

    </Routes>
  );
};
