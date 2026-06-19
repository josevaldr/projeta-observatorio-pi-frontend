# 🚀 PROJETA — Observatório de Projetos Integradores (Frontend)

## 📝 Descrição do Sistema
O **Observatório de Projetos Integradores** é uma plataforma estratégica de governança acadêmica e vitrine tecnológica, concebida para centralizar o ciclo de vida da produção prática em instituições de ensino e estabelecer uma conexão direta com o mercado de trabalho. 

Este repositório concentra exclusivamente a **camada de Frontend (Interface do Usuário)**, responsável por dar vida ao ecossistema unificado onde o estudante se transforma em autor através de uma experiência fluida, responsiva e intuitiva.

---

## 🎨 O Ecossistema Visual & Telas
A interface foi projetada para atender aos diferentes perfis de usuários mapeados no sistema:

### 1. Páginas de Acesso Público
* **Cadastro & Login:** Fluxo de autenticação e criação de conta.
* **Portfólio Público:** Página dedicada para visualização externa do currículo e projetos de cada aluno (via link compartilhável).

### 2. Painel do Aluno (Área Logada)
* **Feed:** Timeline com atualizações, avisos e visão geral das atividades.
* **Projetos:** Gerenciamento, submissão de Projetos Integradores e upload de artefatos.
* **Portfólio:** Ferramenta para criação e customização da vitrine profissional.
* **Perfil:** Edição de informações pessoais, competências e habilidades.

### 3. Painel do Professor
* **Turmas:** Visualização e gerenciamento das turmas sob responsabilidade do docente.
* **Projetos:** Acompanhamento, orientação e avaliação dos trabalhos submetidos pelos alunos.
* **Perfil:** Gerenciamento das informações e dados do professor.

### 4. Portal da Empresa
* **Vitrine:** Acesso simplificado aos projetos e portfólios em destaque para prospecção de talentos.
* **Perfil:** Gerenciamento de informações institucionais da empresa parceira.

### 5. Painel da Coordenação (Admin)
* **Painel (Dashboard):** Visão geral estratégica sobre o andamento e uso da plataforma.
* **Cadastros:** Gerenciamento e aprovação de usuários (alunos, professores e empresas).
* **Acompanhamento:** Monitoramento global das atividades e métricas institucionais.
* **Perfil:** Edição de credenciais administrativas.

---

## 💻 Tecnologias Utilizadas

Este projeto foi construído utilizando as seguintes tecnologias:

* **[React](https://react.dev/) (v19)** - Biblioteca JavaScript para construção de interfaces de usuário.
* **[Vite](https://vitejs.dev/)** - Ferramenta de build ágil para o desenvolvimento.
* **[Tailwind CSS](https://tailwindcss.com/) (v4)** - Framework CSS utility-first para estilização rápida e responsiva.
* **[React Router DOM](https://reactrouter.com/)** - Biblioteca para gerenciamento de rotas no frontend.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* **[Node.js](https://nodejs.org/)** instalado (versão 18 ou superior recomendada).

### Passos para Instalação e Execução

1. Clone este repositório para a sua máquina local (ou faça o download do ZIP):
   ```bash
   git clone <https://github.com/josevaldr/projeta-observatorio-pi-frontend.git>
   ```

2. Acesse a pasta do projeto pelo terminal:
   ```bash
   cd projeta-observatorio-pi-frontend
   ```

3. Instale as dependências necessárias utilizando o npm:
   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. O servidor será iniciado e exibirá uma URL no terminal. Acesse a aplicação no seu navegador (geralmente em `http://localhost:5173`).

---

## 🔗 Repositório do Backend

A API, persistência de dados e regras de negócio estão implementadas no Backend da aplicação. Você pode acessar o repositório oficial no link abaixo:

* **Backend Repository:** [https://github.com/josevaldr/projeta-observatorio-pi-backend](https://github.com/josevaldr/projeta-observatorio-pi-backend)
