---
title: "ShellSort"
date: 2024-11-18
tags: [algoritmos, ordenação, c]
---

# ShellSort

> "Um [[insertion-sort]] com um coelho pulando no meio."

O ShellSort pré-organiza o array com saltos maiores antes de executar o insertion sort final, evitando o custo de "empurrar" elementos por longas distâncias.

**Vantagem sobre InsertionSort:** enquanto o Insertion Sort realiza muitas cópias consecutivas, o ShellSort apenas troca posições distantes, reduzindo significativamente o número de operações.

## A metáfora do coelho

Imagine um coelho pulando sobre a lista com saltos fixos (o **gap**). Conforme o coelho se cansa, os saltos ficam mais curtos — até que o gap chega a 1, momento em que o algoritmo se torna um insertion sort comum, mas a lista já está quase ordenada.

## Sequências de gap conhecidas

| Nome | Sequência |
|---|---|
| Hibbard | 2^k − 1 |
| Knuth | (3^k − 1) / 2 |
| Sedgewick | 1, 5, 19, 41, 109… |
| Ciura (empírica) | 1, 4, 10, 23, 57, 132, 301, 701, 1750 |

## Implementação em C (Knuth)

```c
char** sortPeople(char** names, int namesSize, int* heights,
                  int heightsSize, int* returnSize) {
    int h = 1;
    while (h <= heightsSize / 3) {
        h = h * 3 + 1;  // Sequência de Knuth
    }

    while (h > 0) {
        for (int i = h; i < heightsSize; i++) {
            int tempHeight = heights[i];
            char* tempName = names[i];
            int j = i;

            while (j >= h && heights[j - h] <= tempHeight) {
                heights[j] = heights[j - h];
                names[j] = names[j - h];
                j -= h;
            }

            heights[j] = tempHeight;
            names[j] = tempName;
        }
        h = (h - 1) / 3;
    }

    *returnSize = namesSize;
    return names;
}
```

## Desempenho

| Algoritmo | Tempo (LeetCode) |
|---|---|
| Selection Sort | 45ms |
| Insertion Sort | 15ms |
| **Shell Sort** | **0ms** |

O ShellSort atingiu 0ms (100% de aproveitamento). O consumo de memória ficou levemente maior, mas a diferença é mínima (~0.32MB).

---

Anterior: [[insertion-sort]] | Próximo: [[quicksort]]
