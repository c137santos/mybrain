---
title: "Insertion Sort"
date: 2024-10-30
tags: [algoritmos, ordenação, c]
---

# Insertion Sort

O Insertion Sort é eficiente para ordenar um número **pequeno** de elementos. Funciona "empurrando" elementos até encontrar a posição correta de um pivô — como inserir uma carta de baralho na posição certa na mão.

**Complexidade:** O(n²) no caso geral; O(n) quando a lista já está ordenada.

## Dois personagens principais

- **Pivô:** elemento sob análise que será ordenado (posição `i`)
- **Key:** índice móvel que percorre os predecessores para achar onde encaixar o pivô (começa em `i-1`, anda para trás)

## Regras

1. Todo array com 0 ou 1 elemento já está ordenado
2. O pivô libera sua posição para que elementos maiores sejam "empurrados" para frente
3. A análise começa na segunda posição — o primeiro elemento é considerado ordenado
4. A key para quando atinge o índice 0 ou encontra um elemento maior que o pivô

## Implementação em C

```c
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int pivo = arr[i];
        int key = i - 1;
        while (key >= 0 && arr[key] > pivo) {
            arr[key + 1] = arr[key];
            key--;
        }
        arr[key + 1] = pivo;
    }
}
```

## Exemplo: LeetCode 2418 — Sort the People

Ordenar nomes por altura em ordem decrescente:

```c
char** sortPeople(char** names, int namesSize, int* heights,
                  int heightsSize, int* returnSize) {
    for (int i = 1; i < heightsSize; i++) {
        int pivo = heights[i];
        char* namePivo = names[i];
        int key = i - 1;

        while (key >= 0 && heights[key] < pivo) {
            heights[key + 1] = heights[key];
            names[key + 1] = names[key];
            key--;
        }

        heights[key + 1] = pivo;
        names[key + 1] = namePivo;
    }
    *returnSize = namesSize;
    return names;
}
```

**Performance:** 15ms no LeetCode — mais rápido que o [[selection-sort]] (47ms).

## Complexidade de espaço

O(1) — constante. Não usa memória extra além de variáveis temporárias.

---

Anterior: [[selection-sort]] | Próximo: [[shellsort]]
