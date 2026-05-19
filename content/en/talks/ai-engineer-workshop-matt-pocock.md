---
title: "AI Engineer Workshop — Matt Pocock"
tags:
  - ai
  - software-engineering
  - agents
  - tdd
  - planning
---

# AI Engineer Workshop — Matt Pocock

> ~2h workshop on applying software engineering fundamentals to AI-assisted development. The central thesis: the principles that make code good for humans also make code good for AI.

## Introduction

Welcome. My name is Matt. I'm a teacher and I now teach AI. The thesis I've been developing over the last six months or so is that we all think AI is a new paradigm — and at the same time, we forget that software engineering fundamentals, the stuff that's really crucial to working with humans, also works super well with AI.

## The Weird Constraints LLMs Have

These constraints are the foundation of our work. There's a guy called Dex Hy who runs a company called Human Layer, and he came up with this idea: when you're working with LLMs, they have a **smart zone** and a **dumb zone**.

When you start a new conversation, you start from nothing — and that's when the LLM does its best work, because the attention relationships are the least strained. Every time you add a token to an LLM, it's like adding a team to a football league: the number of matches scales quadratically.

That's because you have attention relationships going from each token to the other that are positional, influencing the meaning of each individual token.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-01-atencao-quadratica.png]]

This means that **around 100k tokens** — regardless of whether you're using a 1 million or 200k context window — the LLM starts getting dumber. As you keep adding things to the same context window, it gets increasingly inaccurate until it starts making poor decisions.

So we want to size our tasks in a way that keeps them within the smart zone. This goes back to old advice — Martin Fowler in *Refactoring*, the Pragmatic Programmer: *"Don't bite off more than you can chew. Keep your tasks small."*

But how do you tackle big tasks? One way is to use **multi-phase plans**: break the enormous task into small sections to execute each part in the smart zone.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-02-plano-multifasico.png]]

And any developer worth their salt will look at this and think: "This is a loop." That's where the idea of **Ralph Wiggum** comes in — you specify the end goal and tell the AI: "Make a small change that gets us closer and closer to our destination."

### Another Constraint: Amnesia

LLMs are like the character from the film *Memento*: they just continually forget. They could just keep resetting back to the base state.

Every session with an LLM goes through the same stages:

1. **System prompt** — you want this to be as small as possible. 250k tokens here and you go straight into the dumb zone.
2. **Exploratory phase** — the agent explores the codebase.
3. **Implementation**
4. **Testing and feedback loops**

When you clear the context, you go right back to the system prompt. That state is always the same — and that's an advantage if you can optimize for it.

On **compacting**: Matt's personal preference is **not to compact**. He prefers the AI to behave like the character from *Memento*, clearing the context and starting fresh, because that state is predictable. The more compaction sediment accumulates, the less predictable the behavior becomes.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-06-duas-restricoes.png]]

---

## Workflow: From Idea to Execution

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-14-fluxo-prd-kanban.png]]

### Grill Me

The first skill in the workflow is **"Grill Me"** — it relentlessly interviews the user about every aspect of the plan until reaching a shared understanding. It walks down each branch of the design tree, resolving dependencies one by one. For each question, it provides its recommended answer and asks questions one at a time.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-07-grill-me-resultado.png]]

The implicit idea Matt argues against here is the **specs to code** movement: write a specification document and turn it directly into code, ignoring the resulting code. In practice, this doesn't work because you need to keep a handle on the code. You need to understand what's in it and shape it, because the code is your battleground.

The goal of "Grill Me" is to reach a **shared understanding** (a concept from Frederick P. Brooks in *The Design of Design*): when everyone is trying to build something together, there is a shared idea among all participants — that is the design concept.

The "Grill Me" can last a long time — 40, 80, even 100 questions. The result is a conversation history that works beautifully as an asset of the design concept being created. It can also work well in meetings: feed in a transcript and use it in a Q&A session.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-08-grill-me-perguntas.png]]

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-04-token-count.png]]

### PRD

After "Grill Me", the next step is writing a **Product Requirements Document (PRD)**.

Two essential documents:
- **Destination document** — describes the project across all its user stories and defines what "done" means.
- **Journey document** — defines how the tasks will be split.

The PRD format includes:
- Problem statement
- Solution
- User stories
- Implementation decisions
- Testing decisions
- **Proposed modules to modify** — keeping code in mind throughout the process, not ignoring it

Matt **doesn't usually read the PRD** after it's written. His reasoning: what is he testing when he reads it? LLMs are excellent at summarization — he already reached alignment with the model during "Grill Me". Reviewing the PRD would just be checking the LLM's ability to summarize. The alignment already happened.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-15-fora-do-escopo.png]]

### Dependency Board (Kanban)

After the PRD, the next step is not a sequential plan but a **dependency board** structured as tasks with blocking relationships between them.

Key technique: **tracer bullets** / **vertical slices**.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-10-tracer-bullets.png]]

AI tends to work **horizontally** — implementing layer by layer: first everything related to the database, then the API, and only then the front end. The problem is you only get feedback at the end, when everything has already been built.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-11-trabalho-horizontal.png]]

The ideal is to work with **vertical slices** — small units of functionality that cross all the necessary layers. This allows continuous feedback from the earliest phases.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-12-fatiamento-vertical.png]]

In practice: when splitting a PRD into tasks, independent issues are created based on these vertical slices.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-09-kanban-board.png]]

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-13-regras-fatiamento.png]]

Preference for this model over a sequential plan:
- A sequential plan forces linear execution — only one agent at a time.
- The dependency-based model allows **parallelization**: multiple agents working simultaneously on unblocked tasks, structured as a directed acyclic graph (DAG).

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-18-grafo-dependencias.png]]

Two types of tasks in the AI era:
- **HITL tasks (Human In The Loop)** — where a human needs to be present.
- **AFK tasks (Away From Keyboard)** — where the human can step away and the exact implementation doesn't matter as much.

The alignment phase (planning) requires human intervention. The implementation of AFK tasks can be delegated.

---

## Ralph: The AFK Agent

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-03-zona-inteligente-resumo.png]]

**Ralph** is the agent that executes AFK tasks in a loop. The basic script (`once.sh`):

```bash
issues=$(cat issues/*.md 2>/dev/null || echo "No issues found")
commits=$(git log -n 5 --format="%H%n%ad%n%B---" --date=short)
prompt=$(cat ralph/prompt.md)

claude --permission-mode acceptEdits \
  "Previous commits: $commits Issues: $issues $prompt"
```

The full loop (`afk.sh`) runs Claude inside an isolated Docker container, streams output as JSON, and checks whether the agent declared `<promise>NO MORE TASKS</promise>` to stop.

Ralph's prompt defines task prioritization criteria:
1. Critical bug fixes
2. Development infrastructure
3. Tracer bullets for new features
4. Polish and quick wins
5. Refactors

Execution cycle: explore the repository → implement via TDD → run feedback loops → commit → move issue to `done/` or update with what was done.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-16-resumo-task-qa.png]]

---

## TDD with AI

TDD is essential when working with agents. The **red–green–refactor** cycle:
1. Write a failing test (red)
2. Implement the minimum needed to make it pass (green)
3. Refactor

A common problem: AI tends to "cheat" on tests when working in layers — it implements everything and then writes tests that merely confirm what it already did. With TDD, the test comes first, so the implementation must conform to it. This makes it much harder to cheat.

On using AI for **quality control**: it makes sense. After implementation, the AI itself can review the code. An important detail: if you implement something using a "rich" context and then try to review without clearing it, the review tends to be less effective. Clearing the context and running the review in isolation improves quality.

---

## QA

Manual QA is where you apply **human judgment** — taste, critical sense, context. Many teams try to automate absolutely everything; the result is systems that work technically but lack quality or refinement.

QA is the moment to impose more subjective criteria — what "feels right", what makes sense for the user.

Important: the quality of feedback loops defines the ceiling of what AI can deliver. If results are bad, the problem usually lies in the absence — or low quality — of those loops.

---

## Bad Codebases: Shallow vs. Deep Modules

Reference: *A Philosophy of Software Design* by John Ousterhout.

**Shallow modules**: many small files, highly interdependent, exporting small functions between each other. This creates:
- Navigation difficulty (for humans and AI)
- Testing difficulty (unclear boundaries)

Without guidance, AI tends to create code in the "shallow" style — many small files, low cohesion, high dependency.

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-17-modulos-rasos.png]]

**Deep modules**: simple interface (small public surface) + rich implementation (lots of encapsulated internal logic). Benefits:
- You test the module as a whole, with a clear boundary
- No need to mock everything
- Callers deal with a simple API
- AI feedback loops become much better

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-19-modulos-profundos.png]]

In practice: in the PRD, clearly define which modules exist, which will be modified, which new modules will be created, and what the expected interface of each is.

How to balance speed with understanding? Separate **interface** from **implementation**:
- You design the modules (structure, responsibilities, contracts)
- Delegate the implementation to AI

Modules work like "gray boxes": you don't need to know every internal detail, but you need to understand what they do, how they behave, and what their inputs and outputs are.

---

## Documentation as PRD?

A clear risk: **documentation rot**. The PRD becomes outdated and AI finds it, treating it as truth, generating inconsistencies.

Matt's solution: **don't keep these documents in the repository**. Since he uses GitHub Issues, he simply marks them as closed — still accessible as history, but with a clear signal that it's no longer the current state.

---

## Push vs. Pull for Code Standards

Two approaches to ensure code follows standards:

- **Push**: send instructions directly to the model (e.g., a `claude.md` file with rules).
- **Pull**: make information available for the agent to fetch when needed (e.g., skills in the repository with clear descriptions).

During **implementation**: pull makes more sense — the agent consults standards on demand.  
During **review**: push makes more sense — you explicitly provide the standards and ask for validation.

In practice: Sonnet for implementation, Opus for review (review requires more reasoning capacity).

---

## Sand Castle: From Sequential to Parallel

![[media/palestras/ai-engineer-workshop-matt-pocock/slide-20-sand-castle.png]]

TypeScript library for running AFK loops in a parallelized fashion. Flow:

1. **Planner**: analyzes the backlog and selects tasks to execute in parallel (respecting Kanban dependencies)
2. **Sandbox per task**: creates an isolated worktree in a Docker container for each task
3. **Implementer agent**: executes the implementation inside the sandbox
4. **Merge agent**: receives the created branches, performs the merge, and resolves type/test issues

---

## Summary

Throughout the entire process, constant attention is paid to **code structure**. This is not about simply using AI to generate code in sequence — there is intention in how modules and architecture are organized.

Full flow:
1. **Idea** → "Grill Me" → alignment with the model
2. **PRD** → destination document
3. **Kanban** → parallelizable tasks with dependency relationships
4. **Implementation** (AFK agents) → TDD → feedback loops
5. **QA** → human judgment → new tasks in the backlog
6. **Review** → share with the team

The Kanban board allows continuously adding tasks, including blocking tasks surfaced during QA.

**If there's one thing to take from this session**: revisit older books. *Refactoring*, *The Pragmatic Programmer*, *A Philosophy of Software Design*, *The Design of Design* — many of those ideas were already well formulated, and apply directly to AI-assisted development.
