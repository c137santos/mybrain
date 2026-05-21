---
title: "Selection Sort"
date: 2024-10-18
tags: [algoritmos, ordenação, c]
---

# Selection Sort

O Selection Sort é extremamente simples, mas ineficiente. Funciona bem apenas para pequenas quantidades de elementos.

**Complexidade de tempo:** O(n²)

## Como funciona

A analogia perfeita é o sistema **round-robin** (todos-contra-todos) do futebol: cada elemento enfrenta todos os outros para determinar quem é o menor.

### Passos

a) Selecione o primeiro elemento  
b) Compare-o com todos os demais, procurando o menor (para ordenação crescente)  
c) Troque as posições quando encontrar um menor  
d) Passe para o próximo elemento — o anterior já está ordenado  

**Ponto crítico:** é necessário percorrer a lista inteira cada vez. O número máximo de trocas envolvendo um único elemento é **n - 1**.

## Implementação em C

```c
void selectionSort(int lista[], int inicio, int fim) {
    int i, j;
    for (i = inicio; i < fim; i++) {
        int min = i;
        for (j = i + 1; j <= fim; j++) {
            if (lista[j] < lista[min]) {
                min = j;
            }
        }
        int temp = lista[i];
        lista[i] = lista[min];
        lista[min] = temp;
    }
}
```

## Dois `for`s aninhados

O algoritmo requer exatamente **2 loops aninhados** — esse aninhamento é responsável pela complexidade O(n²).

- **Loop externo:** elege cada posição como mínimo provisório da rodada
- **Loop interno:** percorre o restante comparando o atual com todos os subsequentes

## Exemplo: LeetCode 2418 — Sort the People

Ordenar nomes por altura em ordem decrescente. Busca-se pelo **maior** valor em vez do menor:

```c
char** sortPeople(char** names, int namesSize, int* heights,
                  int heightsSize, int* returnSize) {
    int i, j;
    for (i = 0; i < heightsSize - 1; i++) {
        int max = i;
        for (j = i + 1; j < heightsSize; j++) {
            if (heights[max] < heights[j]) max = j;
        }
        int tempHei = heights[i];
        heights[i] = heights[max];
        heights[max] = tempHei;

        char* tempName = names[i];
        names[i] = names[max];
        names[max] = tempName;
    }
    *returnSize = namesSize;
    return names;
}
```

---

Anterior: [[pilhas-e-filas]] | Próximo: [[insertion-sort]]
