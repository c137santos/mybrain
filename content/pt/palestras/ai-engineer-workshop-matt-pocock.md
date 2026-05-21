---
title: "AI Engineer Workshop — Matt Pocock"
tags:
  - ia
  - engenharia-de-software
  - agentes
  - tdd
  - planejamento
---

# AI Engineer Workshop — Matt Pocock

> Workshop de ~2h sobre como aplicar fundamentos de engenharia de software ao desenvolvimento com IA. A tese central: os princípios que tornam o código bom para humanos também tornam o código bom para a IA.

## Introdução

Então, sejam bem-vindos. Meu nome é Matt. Sou professor e, atualmente, leciono IA. A tese que tenho desenvolvido nos últimos seis meses é que todos nós acreditamos que a IA é um novo paradigma — e, ao mesmo tempo, esquecemos que os fundamentos da engenharia de software, aquilo que é crucial para trabalhar com humanos, também funciona muito bem com IA.

## Restrições peculiares que os LLMs têm

Essas restrições são a base do nosso trabalho. Existe um cara chamado Dex Hy, que dirige uma empresa chamada Human Layer, e ele teve uma ideia: quando você trabalha com LLMs, eles têm uma **zona inteligente** e uma **zona burra**.

Quando você inicia uma nova conversa, começa do zero — e é quando o LLM funciona melhor, porque as relações de atenção são menos tensionadas. Cada vez que você adiciona um token a um LLM, é como adicionar um time a um campeonato de futebol: o número de partidas aumenta quadraticamente.

Isso acontece porque existem relações de atenção que vão de cada token para o outro, e essas relações são posicionais, influenciando o significado de cada token individual.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-01-atencao-quadratica.png|Diagrama mostrando crescimento quadrático das relações de atenção conforme o número de tokens aumenta na janela de contexto]]

Isso significa que **em torno de 100 mil tokens** — não importa se você está usando uma janela de contexto de 1 milhão ou 200 mil — o LLM começa a ficar cada vez mais burro. Conforme você continua adicionando coisas à mesma janela de contexto, ela fica cada vez mais imprecisa até tomar decisões ruins.

Então, queremos dimensionar nossas tarefas de forma que permaneçam dentro da zona inteligente. Isso remete a conselhos antigos, como os que Martin Fowler, em *"Refactoring"*, fala sobre o programador pragmático: *"Não dê um passo maior que a perna. Mantenha suas tarefas pequenas."*

Mas como lidar com tarefas grandes? Uma maneira é usar **planos multifásicos**: dividir a tarefa enorme em pequenas seções para executar cada parte na zona inteligente.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-02-plano-multifasico.png|Esquema de plano multifásico dividindo uma tarefa grande em fases menores, cada uma dentro da zona inteligente do LLM]]

E qualquer desenvolvedor que se preze vai olhar para isso e pensar: "Isso é um loop." É por aqui que chega a ideia do **Ralph Wiggum** — basicamente, você especifica o objetivo final e diz à IA: "Faça uma pequena mudança que nos aproxime cada vez mais do nosso objetivo."

### Outra limitação: Amnésia

Os LLMs são como o personagem do filme "Amnésia": eles simplesmente esquecem continuamente. Poderiam reiniciar e voltar ao estado base.

Cada sessão com um LLM passa pelas mesmas etapas:

1. **Prompt do sistema** — quer que seja o menor possível. 250 mil tokens aqui e você já vai direto para a zona de inatividade.
2. **Fase exploratória** — o agente explora a base de código.
3. **Implementação**
4. **Testes e loops de feedback**

Quando você limpa o contexto, volta direto ao prompt do sistema. Esse estado é sempre o mesmo — e isso é uma vantagem se você conseguir otimizar para ele.

Sobre **compactação**: preferência pessoal do Matt é **não compactar**. Ele prefere que a IA se comporte como o personagem do filme "Amnésia", limpando o contexto e voltando ao início, porque esse estado é previsível. Quanto mais sedimentos de compactação acumulam, menos previsível fica o comportamento.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-06-duas-restricoes.png|Slide resumindo as duas restrições dos LLMs: atenção quadrática e amnésia entre sessões]]

---

## Fluxo de trabalho: da ideia à execução

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-14-fluxo-prd-kanban.png|Fluxo completo do processo: Ideia → Grill Me → PRD → Kanban, com indicação das etapas HITL e AFK]]

### Grill Me

A primeira skill do fluxo é o **"Grill Me"** — ela entrevista o usuário incessantemente sobre todos os aspectos do plano até chegar a um entendimento comum. Percorre cada ramo da árvore de design, resolvendo as dependências uma a uma. Para cada pergunta, fornece sua resposta recomendada e faz as perguntas uma de cada vez.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-07-grill-me-resultado.png|Exemplo de output de uma sessão Grill Me: entendimento compartilhado alcançado após série de perguntas sobre o design]]

A ideia implícita que o Matt contesta aqui é o movimento **"specs to code"**: escrever um documento de especificação e transformá-lo diretamente em código, ignorando o código resultante. Na prática, isso não funciona porque você precisa controlar o código. Você precisa entender o que está nele e moldá-lo, porque o código é o seu campo de batalha.

O objetivo do "Grill Me" é alcançar um **entendimento compartilhado** (conceito de Frederick P. Brooks em *"Design of Design"*): quando todos estão tentando construir algo juntos, existe uma ideia compartilhada entre todos os participantes — e esse é o conceito de design.

O "Grill Me" pode durar bastante — 40, 80, até 100 perguntas. O resultado é um histórico de conversa que serve como excelente recurso para o conceito de design que está sendo criado. Também pode funcionar bem em reuniões: inserir a transcrição e usar em uma sessão de perguntas e respostas.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-08-grill-me-perguntas.png|Exemplos das perguntas feitas pelo Grill Me durante a entrevista de design, cobrindo cada ramo da árvore de decisões]]

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-04-token-count.png|Contagem de tokens de uma sessão Grill Me mostrando o tamanho do contexto resultante do processo de alinhamento]]

### PRD

Depois do "Grill Me", o próximo passo é escrever um **Documento de Requisitos do Produto (PRD)**.

Dois documentos essenciais:
- **Documento do destino** — descreve o projeto em todas as suas histórias de usuário e define o que significa "concluído".
- **Documento da jornada** — define como será a divisão das tarefas.

O formato do PRD inclui:
- Declaração do problema
- Solução
- Histórias de usuário
- Decisões de implementação
- Decisões de teste
- **Módulos propostos para modificação** — manter o código em mente durante todo o processo, não ignorá-lo

Matt **não costuma ler o PRD** depois de escrito. O motivo: o que ele está testando ao lê-lo? Os LLMs são excelentes em resumir — ele já alcançou o mesmo alinhamento com o modelo durante o "Grill Me". Verificar o PRD seria apenas checar a capacidade do LLM de resumir. O alinhamento já aconteceu antes.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-15-fora-do-escopo.png|Slide do PRD listando itens explicitamente fora do escopo para evitar que a IA os implemente desnecessariamente]]

### Quadro de contenção de dependência (Kanban)

Depois do PRD, o próximo passo não é um plano sequencial, mas um **quadro de contenção** estruturado em tarefas com relações de dependência entre elas.

Técnica importante: **rastreamento de balas** (tracer bullets) / **fatias verticais**.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-10-tracer-bullets.png|Diagrama explicando o conceito de tracer bullets: fatias que atravessam todas as camadas do sistema para validar o caminho completo cedo]]

A IA tende a trabalhar **horizontalmente** — implementar por camadas: primeiro tudo relacionado ao banco de dados, depois a API, e só então o front-end. O problema é que você só recebe feedback no final, quando tudo já foi construído.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-11-trabalho-horizontal.png|Diagrama do padrão horizontal da IA: implementa banco de dados → API → front-end em sequência, com feedback tardio]]

O ideal é trabalhar com **fatias verticais** — pequenas unidades de funcionalidade que atravessam todas as camadas necessárias. Isso permite obter feedback contínuo já nas primeiras fases.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-12-fatiamento-vertical.png|Diagrama do fatiamento vertical: cada tarefa cobre todas as camadas necessárias para entregar uma fatia completa de funcionalidade]]

Na prática: ao dividir um PRD em tarefas, cria-se problemas independentes baseados nessas fatias verticais.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-09-kanban-board.png|Quadro Kanban com colunas de tarefas organizadas por dependências, mostrando quais podem ser executadas em paralelo]]

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-13-regras-fatiamento.png|Regras para criação de issues a partir do fatiamento vertical: independência, tamanho adequado e fronteiras claras]]

Preferência por esse modelo em vez de plano sequencial:
- Um plano sequencial força execução linear — apenas um agente por vez.
- O modelo baseado em dependências permite **paralelização**: vários agentes trabalhando simultaneamente nas tarefas desbloqueadas, estruturado como um grafo direcionado acíclico (DAG).

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-18-grafo-dependencias.png|Grafo acíclico direcionado (DAG) das tarefas do Kanban mostrando as relações de bloqueio e oportunidades de paralelização]]

Dois tipos de tarefas na era da IA:
- **Tarefas HITL (Human In The Loop)** — onde o humano precisa estar presente.
- **Tarefas AFK (Away From Keyboard)** — onde o humano pode estar longe do teclado e a implementação exata não importa tanto.

A fase de alinhamento (planejamento) exige intervenção humana. A implementação das tarefas AFK pode ser delegada.

---

## Ralph: o agente AFK

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-03-zona-inteligente-resumo.png|Resumo visual da zona inteligente vs. zona burra do LLM, com o ponto de inflexão em torno de 100k tokens]]

**Ralph** é o agente que executa as tarefas AFK em loop. O script básico (`once.sh`):

```bash
issues=$(cat issues/*.md 2>/dev/null || echo "No issues found")
commits=$(git log -n 5 --format="%H%n%ad%n%B---" --date=short)
prompt=$(cat ralph/prompt.md)

claude --permission-mode acceptEdits \
  "Previous commits: $commits Issues: $issues $prompt"
```

O loop completo (`afk.sh`) executa o Claude dentro de um container Docker isolado, streama o output em JSON, e verifica se o agente declarou `<promise>NO MORE TASKS</promise>` para parar.

O prompt do Ralph define critérios de priorização de tarefas:
1. Correções críticas de bugs
2. Infraestrutura de desenvolvimento
3. Tracer bullets para novos recursos
4. Polish e quick wins
5. Refatorações

Ciclo de execução: explorar o repositório → implementar via TDD → rodar ciclos de feedback → commit → mover issue para `done/` ou atualizar com o que foi feito.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-16-resumo-task-qa.png|Ciclo task → implementação via TDD → QA humano → novas tasks, mostrando o loop de entrega do agente Ralph]]

---

## TDD com IA

TDD é essencial quando se trabalha com agentes. O ciclo **vermelho–verde–refatoração**:
1. Escrever um teste que falha (vermelho)
2. Implementar o mínimo necessário para fazê-lo passar (verde)
3. Refatorar

Um problema comum: a IA tenta "burlar" os testes quando trabalha em camadas — implementa tudo e depois escreve testes que apenas confirmam o que já fez. Com TDD, o teste vem antes, então a implementação precisa se adequar a ele. Isso torna muito mais difícil "burlar" os testes.

Sobre uso da IA para **controle de qualidade**: faz sentido. Depois da implementação, a própria IA pode revisar o código. Um detalhe importante: se você implementa algo usando um contexto "rico" e depois tenta revisar sem limpar, a revisão tende a ser menos eficaz. Limpar o contexto e executar a revisão de forma isolada melhora a qualidade.

---

## QA

O QA manual é onde você aplica **julgamento humano** — gosto, senso crítico, contexto. Muitas equipes tentam automatizar absolutamente tudo; o resultado são sistemas que funcionam tecnicamente, mas carecem de qualidade ou refinamento.

O QA é o momento de impor critérios mais subjetivos — o que "parece certo", o que faz sentido para o usuário.

Importante: a qualidade dos ciclos de feedback define o limite do que a IA consegue entregar. Se os resultados estão ruins, normalmente o problema está na falta — ou na baixa qualidade — desses ciclos.

---

## Base de código ruim: módulos rasos vs. profundos

Referência: *A Philosophy of Software Design*, de John Ousterhout.

**Módulos rasos**: vários arquivos pequenos, altamente interdependentes, exportando pequenas funções entre si. Gera:
- Dificuldade de navegação (para humanos e IA)
- Dificuldade de teste (limites pouco claros)

Sem orientação, a IA tende a criar código no estilo "raso" — muitos arquivos pequenos, baixa coesão, alta dependência.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-17-modulos-rasos.png|Diagrama de módulos rasos: muitos arquivos pequenos e interdependentes com alta exposição de superfície pública]]

**Módulos profundos**: interface simples (pequena superfície pública) + implementação rica (muita lógica interna encapsulada). Benefícios:
- Você testa o módulo como um todo, com limite claro
- Não precisa mockar tudo
- Quem consome lida com uma API simples
- Ciclos de feedback da IA ficam muito melhores

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-19-modulos-profundos.png|Diagrama de módulos profundos: interface pública pequena com implementação interna rica e encapsulada]]

Na prática: no PRD, definir claramente quais módulos existem, quais serão modificados, quais novos módulos serão criados e qual a interface esperada de cada um.

Como equilibrar velocidade com entendimento? Separar **interface** de **implementação**:
- Você projeta os módulos (estrutura, responsabilidades, contratos)
- Delega a implementação para a IA

Os módulos funcionam como "caixas cinzas": você não precisa saber cada detalhe interno, mas precisa entender o que fazem, como se comportam e quais são suas entradas e saídas.

---

## Documentação como PRD?

Um risco claro: **deterioração da documentação**. O PRD fica desatualizado e a IA o encontra, tratando-o como verdade, gerando inconsistências.

Solução de Matt: **não manter esses documentos no repositório**. Como usa GitHub Issues, simplesmente marca como concluído — continua acessível como histórico, mas há um sinal claro de que aquilo não é mais o estado atual.

---

## Push vs. Pull para padrões de código

Duas abordagens para garantir que o código siga padrões:

- **Push**: enviar instruções diretamente para o modelo (ex: arquivo `claude.md` com regras).
- **Pull**: deixar as informações disponíveis para o agente buscar quando precisar (ex: skills no repositório com descrições claras).

Na **implementação**: faz mais sentido usar *pull* — o agente consulta os padrões sob demanda.
Na **revisão**: faz mais sentido usar *push* — você fornece explicitamente os padrões e pede validação.

Na prática: Sonnet para implementação, Opus para revisão (revisão exige mais capacidade de raciocínio).

---

## Sand Castle: de sequencial para paralelo

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-20-sand-castle.png|Arquitetura da biblioteca Sand Castle: Planejador → Sandboxes por tarefa → Agentes implementadores → Agente de merge]]

Biblioteca em TypeScript para rodar loops AFK de forma paralelizada. Fluxo:

1. **Planejador**: analisa o backlog e escolhe tarefas para executar em paralelo (respeitando dependências do Kanban)
2. **Sandbox por tarefa**: cria uma árvore de trabalho isolada em container Docker para cada tarefa
3. **Agente implementador**: executa a implementação dentro do sandbox
4. **Agente de merge**: recebe os branches criados, realiza a fusão e resolve problemas de tipos/testes

---

## Resumo geral

Ao longo de todo o processo, mantém-se atenção constante à **estrutura do código**. Não se trata de simplesmente usar uma IA para gerar código em sequência — há intenção na forma como se organizam módulos e arquitetura.

Fluxo completo:
1. **Ideia** → "Grill Me" → alinhamento com o modelo
2. **PRD** → documento de destino
3. **Kanban** → tarefas paralelizáveis com relações de dependência
4. **Implementação** (agentes AFK) → TDD → loops de feedback
5. **QA** → julgamento humano → novas tarefas no backlog
6. **Revisão** → compartilhar com a equipe

O quadro Kanban permite adicionar tarefas continuamente, inclusive tarefas bloqueadoras surgidas durante o QA.

**Se houver uma coisa para levar desta sessão**: revisite livros mais antigos. *Refactoring*, *The Pragmatic Programmer*, *A Philosophy of Software Design*, *Design of Design* — muitas dessas ideias já estavam bem formuladas lá atrás, e se aplicam diretamente ao desenvolvimento com IA.
