# Guia para Apresentação PowerPoint – Prova de Aptidão Profissional
## StablePack – Análise de Embalagens com IA

Use este guia para estruturar a tua apresentação. Completa com informações do teu **Relatório Final** (objetivos, metodologia, conclusões, etc.) onde indicado.

---

## Estrutura sugerida (cerca de 15–20 slides)

### 1. Capa
- **Título:** StablePack – Proteção de Embalagens com Inteligência Artificial  
- **Subtítulo:** Prova de Aptidão Profissional  
- **Nome, curso, escola, ano letivo**  
- **Logotipo** (usa `assets/images/logo.png`)

---

### 2. Índice / Agenda
- Contexto e motivação  
- Objetivos  
- Enquadramento técnico  
- Desenvolvimento do projeto  
- Demonstração da aplicação  
- Conclusões e trabalho futuro  

---

### 3. Contexto e motivação
- **Problema:** necessidade de monitorizar embalagens e detetar danos de forma rápida e fiável.  
- **Solução:** aplicação móvel que usa IA para analisar imagens de embalagens em tempo real.  
- **Referência ao relatório:** cita aqui o enquadramento que escreveste (logística, e‑commerce, armazéns, etc.).

---

### 4. Objetivos do projeto
- **Objetivo geral:** (transcreve do relatório)  
- **Objetivos específicos:**  
  - Desenvolver uma app móvel multiplataforma (Android, iOS, Web).  
  - Integrar câmara e análise de imagem com modelo de IA.  
  - Fornecer dashboard com estatísticas e alertas.  
  - Garantir autenticação e histórico de análises.  
- Ajusta à redação exata do teu relatório.

---

### 5. Enquadramento técnico – Stack tecnológica
- **Frontend / App:**  
  - **Expo** (SDK 54) + **React Native**  
  - **React** 19, **TypeScript** 5.9  
  - **Expo Router** (rotas baseadas em ficheiros)  
- **UI e animações:**  
  - React Native Reanimated, Gesture Handler  
  - Linear Gradient, SVG  
- **Câmara e media:** Expo Camera, Expo Image  
- **Fontes:** Archivo, Poppins  

Sugestão: um slide com ícones/logos das tecnologias (Expo, React Native, TypeScript).

---

### 6. Arquitetura da aplicação
- **Estrutura de pastas (resumida):**  
  - `app/` – ecrãs e rotas (Expo Router)  
  - `components/` – componentes reutilizáveis  
  - `lib/` – API e utilitários  
  - `assets/` – imagens e ícones  
- **Fluxo principal:** Splash → Boas-vindas → Login/Registo → Dashboard → Câmara (análise) → Histórico → Definições.  
- Podes usar um diagrama simples (draw.io ou PowerPoint) com setas entre ecrãs.

---

### 7. Funcionalidades principais (1) – Autenticação
- Registo e login (email/password).  
- Recuperação de palavra-passe.  
- Login social (Google, Facebook, Apple) – se estiver no relatório.  
- Referência aos ficheiros: `login.tsx`, `signin.tsx`, `forgot-password.tsx`.

---

### 8. Funcionalidades principais (2) – Análise de embalagens
- Captura de imagem com a câmara do dispositivo.  
- Envio da imagem para o backend (API).  
- Modelo de IA devolve: **Intacto** ou **Danificado**.  
- Resultado em tempo quase real.  
- Referência: `app/camera.tsx`, integração com `lib/api.ts`.

---

### 9. Funcionalidades principais (3) – Dashboard e sensores
- Estatísticas de embalagens analisadas.  
- Alertas recentes (embalagens danificadas).  
- Monitorização de temperatura e humidade (se aplicável).  
- Referência: `app/dashboard.tsx`.

---

### 10. Backend e API
- **Papel do backend:** autenticação, análise de imagem (modelo de ML), persistência.  
- **Endpoints principais (do README):**  
  - `POST /auth/register`, `POST /auth/login`, `POST /auth/recoverPassword`  
  - `POST /package/analyze` – análise da imagem  
  - Endpoints de login social (Google, Facebook, Apple)  
- Configuração da URL em `lib/api.ts`.  
- Se no relatório tiveres detalhes do modelo de IA ou da API, usa este slide para os resumir.

---

### 11. Design e experiência do utilizador
- Tema escuro (dark theme).  
- Animações com React Native Reanimated.  
- Ícones SVG e fontes Archivo/Poppins.  
- Componentes reutilizáveis (ThemedText, ThemedView, AnimatedCard, etc.).  
- Podes incluir 1–2 capturas de ecrã da app (splash, dashboard, câmara).

---

### 12. Demonstração da aplicação
- **Sugestão:** gravação em vídeo curta (1–2 min) ou demonstração ao vivo.  
- Mostrar:  
  1. Splash e ecrãs de boas-vindas  
  2. Login (ou registo)  
  3. Dashboard  
  4. Abertura da câmara, captura de uma embalagem, resultado da análise (Intacto/Danificado)  
  5. Histórico e definições (brevemente)  
- Se tiveres resultados de testes (precisão, tempo de resposta), refere-os aqui.

---

### 13. Dificuldades e soluções
- **Exemplos possíveis (ajusta ao teu relatório):**  
  - Integração câmara ↔ API (formato da imagem, tamanho).  
  - Compatibilidade Android/iOS/Web com Expo.  
  - Configuração do backend e CORS.  
  - Nova arquitetura do React Native e Reanimated.  
- Para cada ponto: problema → solução adotada.

---

### 14. Conclusões
- Resumo do que foi alcançado face aos objetivos.  
- Impacto do projeto (monitorização de embalagens, uso de IA em contexto real).  
- Limitações atuais (ex.: dependência do backend, necessidade de rede).  
- Transcreve ou adapta as conclusões do teu **Relatório Final**.

---

### 15. Trabalho futuro
- Melhorias possíveis (ex.: análise offline, mais tipos de dano, notificações push).  
- Ideias de evolução (integração com sistemas de armazém, relatórios PDF).  
- Alinha com a secção de “Trabalho futuro” do relatório, se existir.

---

### 16. Referências e agradecimentos
- Documentação oficial: Expo, React Native, TypeScript.  
- Bibliotecas utilizadas (lista curta ou link para o README).  
- Agradecimentos ao orientador, escola, entidade de estágio (se aplicável).

---

### 17. Perguntas
- Slide final: “Perguntas?” e contacto (opcional).

---

## Dicas práticas para o PowerPoint

1. **Menos texto, mais visual:** 3–5 bullet points por slide; usa diagramas e capturas de ecrã.  
2. **Consistência:** mesma fonte e paleta de cores em todos os slides (podes usar as cores do StablePack).  
3. **Capturas de ecrã:** faz prints ao emulador ou telemóvel (splash, login, dashboard, câmara, resultado da análise).  
4. **Relatório em PDF:** abre o teu relatório e copia objetivos, metodologia e conclusões para os slides correspondentes.  
5. **Tempo:** 1–2 min por slide; para 15 slides, ~15–20 min de apresentação.  
6. **Ensaio:** pratica com o timer e com o vídeo da demonstração.

---

## Onde encontrar informação no projeto

| Tema              | Onde no código / docs                         |
|-------------------|-----------------------------------------------|
| Objetivos e visão | README.md (About, Features)                    |
| Tecnologias       | README.md (Technologies), package.json        |
| Estrutura         | README.md (Project Structure), pasta app/     |
| API e backend     | README.md (API Backend), lib/api.ts           |
| Autenticação      | app/login.tsx, signin.tsx, forgot-password.tsx |
| Câmara e análise  | app/camera.tsx, lib/api.ts                    |
| Dashboard         | app/dashboard.tsx                             |
| Configuração      | app.json, README (Configuration, Build)        |

---

## Relatório PDF

Como o **Relatório Final** está em PDF, deves:

1. Abrir o PDF e rever os capítulos (objetivos, metodologia, implementação, conclusões).  
2. Inserir nos slides as frases ou parágrafos mais importantes.  
3. Manter a mesma ordem lógica (objetivos no início, conclusões no fim).  
4. Se tiveres gráficos ou tabelas no relatório, podes reutilizá-los nos slides (exportar como imagem ou redesenhar).

Com este guia e o conteúdo do teu relatório, consegues montar uma apresentação completa e alinhada com o que desenvolveste e documentaste.
