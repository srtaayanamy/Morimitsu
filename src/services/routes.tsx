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
import AlunosAptos from "../pages/AlunosAptos";
import ResultadoPesquisa from "../pages/ResultadoPesquisa";
import FrequenciaTurma from "../pages/FrequenciaTurma";
import InserirAlunosTurma from "../pages/InserirAlunosTurma";
import RemoverAlunosTurma from "../pages/RemoverAlunosTurma";
import VincularProfessoresTurma from "../pages/VincularProfessoresTurma";

// telas de configuração
import Perfil from "../pages/configuracoes/Perfil";
import RegistrosGraduacao from "../pages/configuracoes/RegistrosGraduacao";
import ConfigurarGraduacao from "../pages/configuracoes/ConfigurarGraduacao";
import RegistrosFrequencia from "../pages/configuracoes/RegistrosFrequencia";
import RelatoriosExports from "../pages/configuracoes/RelatoriosExports";
import ManualUsuario from "../pages/configuracoes/ManualUsuário";
import FrequenciaDoDia from "../pages/configuracoes/FrequenciaDoDia";
import CorrigirFrequenciaDoDia from "../pages/configuracoes/CorrigirFrequenciaDoDia";

export default function AppRoutes() {
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
      <Route path="/visualizar-turma/:id" element={<VisualizarTurma />} />
      <Route path="/professores" element={<Professores />} />
      <Route path="/alunos-aptos" element={<AlunosAptos />} />
      <Route path="/frequencia-turma/:id" element={<FrequenciaTurma />} />
      <Route
        path="/turma/:id/inserir-alunos"
        element={<InserirAlunosTurma />}
      />
      <Route
        path="/turma/:id/remover-alunos"
        element={<RemoverAlunosTurma />}
      />
      <Route path="/pesquisa" element={<ResultadoPesquisa />} />
      <Route
        path="/turmas/:id/vincular-professores"
        element={<VincularProfessoresTurma />}
      />

      {/* rotas pai/filho de configuração */}
      <Route path="/configuracoes" element={<Configuration />}>
        <Route path="perfil" element={<Perfil />} />
        <Route path="registros-graduacao" element={<RegistrosGraduacao />} />
        <Route path="configurar-graduacao" element={<ConfigurarGraduacao />} />
        <Route path="registros-frequencia" element={<RegistrosFrequencia />} />
        <Route path="relatorios-exports" element={<RelatoriosExports />} />
        <Route path="manual-usuario" element={<ManualUsuario />} />
        <Route path="frequencia-do-dia" element={<FrequenciaDoDia />} />
        <Route path="corr-freq-do-dia" element={<CorrigirFrequenciaDoDia />} />
      </Route>
    </Routes>
  );
}
