---
title: "Como aprendi Linked List"
date: 2024-09-23
tags: [algoritmos, estruturas-de-dados, c, linked-list]
---

# Como aprendi Linked List

> "Linked List é uma estrutura de dados linear composta por nós"

## Estrutura básica

```c
struct ListNode {
    int val;
    struct ListNode* next;
};
```

## LinkedList vs Array

| Operação | LinkedList | Array |
|---|---|---|
| Acesso | O(n) — percurso sequencial | O(1) — acesso indexado |
| Inserção/Deleção | O(1) | O(n) — deslocamento/realocação |
| Memória | Espaço descontíguo | Alocação contígua |

## Notações de ponteiro em C

- `novaCelula` → ponteiro (endereço de memória)
- `*novaCelula` → desreferência (valor apontado)
- `->` → acesso através de ponteiro
- `.` → acesso direto da estrutura

## Cabeça vs Sem Cabeça

**Com cabeça:** célula especial que marca o início, mesmo quando a lista está vazia.

**Sem cabeça:** ponteiro nulo representa lista vazia.

## Operações principais

### Inserção

Antes de inserir, dois elementos devem apontar para o mesmo `next` — evita perder referências.

```c
void insertNodeInList(int data, struct ListNode* p) {
    struct ListNode *novaCelula = malloc(sizeof(struct ListNode));
    novaCelula->data = data;
    novaCelula->next = p->next;
    p->next = novaCelula;
}
```

### Deleção

Redireciona ponteiros e libera memória, com cuidado para não acessar NULL.

```c
struct ListNode* removeElements(struct ListNode* head, int valorProibido) {
    while (head != NULL && head->val == valorProibido) {
        struct ListNode* temp = head;
        head = head->next;
        free(temp);
    }
    if (head == NULL) return NULL;
    head->next = removeElements(head->next, valorProibido);
    return head;
}
```

### Merge de duas listas ordenadas

Usa [[recursividade]] para comparar e conectar elementos das duas listas mantendo a ordem.

### Swap Nodes in Pairs

Inverte posição de dois em dois elementos trocando apenas ponteiros:

```c
struct ListNode* swapPairs(struct ListNode* head) {
    if (!head || !head->next) return head;
    struct ListNode* current = head;
    struct ListNode* newHead = head->next;
    struct ListNode* previous = NULL;

    while (current && current->next) {
        struct ListNode* nextPair = current->next->next;
        struct ListNode* second = current->next;
        second->next = current;
        current->next = nextPair;
        if (previous) previous->next = second;
        previous = current;
        current = nextPair;
    }
    return newHead;
}
```

---

Anterior: [[recursividade]] | Próximo: [[pilhas-e-filas]]
