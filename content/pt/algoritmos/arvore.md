---
title: "Árvore: Conceito e Varredura"
date: 2024-12-02
tags: [algoritmos, estruturas-de-dados, c, árvore]
---

# Árvore: Conceito e Varredura

As árvores são um conjunto de entidades chamadas **nós**, conectados por **arestas**. Cada nó contém um valor e pode ter filhos, sem conexões duplas entre nós. A estrutura é **hierárquica** — diferente de [[pilhas-e-filas]] e [[linked-list|listas ligadas]], que são lineares.

## Anatomia

| Componente | Descrição |
|---|---|
| **Raiz** | O nó mais alto (sem pai) |
| **Aresta** | Ligação entre dois nós |
| **Filho** | Nó com pai |
| **Pai** | Nó com filhos |
| **Folha** | Nó sem filhos |
| **Altura** | Caminho mais longo até uma folha |
| **Profundidade** | Caminho do nó até a raiz |

## Implementação em C

```c
typedef struct Node {
    int valor;
    struct Node *filho_esquerdo;
    struct Node *filho_direito;
} Node;

typedef struct Tree {
    Node* root;
} Tree;
```

## Árvore Binária

Cada nó possui, no máximo, **dois filhos**. A largura de cada nível em uma árvore balanceada segue o padrão **2^n**.

## Varreduras (traversals)

### Simétrica (In-order)

Visita: filho esquerdo → nó → filho direito.

```c
void varreduraSimetrica(Node* root) {
    if (root == NULL) return;
    varreduraSimetrica(root->filho_esquerdo);
    printf("%d ", root->valor);
    varreduraSimetrica(root->filho_direito);
}
```

### Outros tipos

| Tipo | Ordem de visita |
|---|---|
| **Pré-ordem** | nó → esquerdo → direito |
| **Simétrica** | esquerdo → nó → direito |
| **Pós-ordem** | esquerdo → direito → nó |

## Exemplo: LeetCode 104 — Maximum Depth of Binary Tree

Usar [[recursividade]] para encontrar a maior profundidade da árvore. A solução atingiu 100% de desempenho (0ms) com complexidade O(n) em tempo e espaço.

```c
int maxDepth(struct TreeNode* root) {
    if (root == NULL) return 0;
    int left = maxDepth(root->left);
    int right = maxDepth(root->right);
    return 1 + (left > right ? left : right);
}
```

---

Anterior: [[quicksort]]
