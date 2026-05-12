## Parent PRD

`issues/prd.md`

## What to build

Inicializar o Quartz neste repositório e garantir que o build local funciona. Isso cobre todo o caminho vertical: scaffolding da ferramenta, configuração de aparência, e conteúdo mínimo que prova que o site renderiza corretamente.

Passos concretos:
- Rodar `npx quartz create` na raiz do repositório
- Editar `quartz.config.ts`: setar `defaultDarkMode: true` e `baseUrl` apontando para a URL do GitHub Pages da autora
- Criar `content/index.md` com título e breve introdução (home page)
- Rodar `npx quartz build` e confirmar que termina sem erros

## Acceptance criteria

- [x] `npx quartz create` executado e arquivos do Quartz presentes na raiz
- [x] `quartz.config.ts` tem `baseUrl` correto e dark mode como padrão
- [x] `content/index.md` existe com conteúdo mínimo (título + parágrafo)
- [x] `npx quartz build` completa sem erros

## Blocked by

None — can start immediately

## User stories addressed

- User story 1 (visitante acessa notas em URL pública — base do site)
- User story 3 (dark mode por padrão)
- User story 6 (autora escreve no Obsidian normalmente — content/ é a raiz do vault)
- User story 8 (vault começa com estrutura mínima mas organizada)
