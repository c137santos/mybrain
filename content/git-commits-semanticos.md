---
title: Git Commits Semânticos
tags:
  - programação
---

# Git Commits Semânticos

Commits semânticos seguem uma convenção de formato que torna o histórico do projeto mais legível e fácil de automatizar.

## Formato

```
<tipo>(<escopo>): <descrição>
```

## Tipos comuns

| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `chore` | Tarefas de manutenção sem impacto funcional |
| `docs` | Alterações em documentação |
| `refactor` | Refatoração sem mudança de comportamento |
| `test` | Adição ou correção de testes |

## Exemplo

```
feat(auth): add JWT token refresh endpoint
```

## Por que usar

- Geração automática de changelogs
- Facilita code review ao comunicar intenção
- Permite filtrar histórico por tipo de mudança

---

Voltar para [[index]]
