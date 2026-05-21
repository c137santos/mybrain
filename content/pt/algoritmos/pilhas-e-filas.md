---
title: "Pilhas e Filas"
date: 2024-10-04
tags: [algoritmos, estruturas-de-dados, c, pilha, fila]
---

# Pilhas e Filas

## Pilha (Stack)

A pilha segue o princípio **LIFO — Last In, First Out**: o elemento removido é o que está na estrutura há menos tempo.

Usar [[linked-list|listas ligadas]] evita problemas de overflow presentes em implementações com arrays.

### Operações

| Operação | Descrição |
|---|---|
| `push(item)` | Adiciona elemento no topo |
| `pop()` | Remove elemento do topo |
| `peek()` | Retorna o topo sem remover |
| `isEmpty()` | Verifica se está vazia |

### Detalhe técnico: ponteiro de ponteiro

Ao usar `Node**`, é possível modificar o endereço do primeiro nó da lista, permitindo inserção no início sem perder a referência:

```c
void push(Node** top, int value) {
    Node* newNode = malloc(sizeof(Node));
    newNode->value = value;
    newNode->next = *top;
    *top = newNode;
}
```

## Fila (Queue)

A fila segue o princípio **FIFO — First In, First Out**: o elemento mais antigo é o primeiro a sair.

### Operações

| Operação | Descrição |
|---|---|
| `add(item)` | Adiciona no final |
| `remove()` | Remove do início |
| `peek()` | Retorna o início sem remover |
| `isEmpty()` | Verifica se está vazia |

### Estrutura com dois ponteiros

```
HEAD → [A] → [B] → [C] ← TAIL
```

- **HEAD:** aponta para o início
- **TAIL:** aponta para o final
- A fila fica vazia quando HEAD e TAIL se encontram

## Quando usar cada uma

- **Pilha:** problemas recursivos, controle de contexto, undo/redo
- **Fila:** algoritmos de grafos (especialmente BFS — Busca em Largura), processamento em ordem de chegada

---

Anterior: [[linked-list]] | Próximo: [[selection-sort]]
