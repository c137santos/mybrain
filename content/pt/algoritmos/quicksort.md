---
title: "QuickSort"
date: 2024-11-27
tags: [algoritmos, ordenação, c]
---

# QuickSort

> "O quicksort é uma batalha constante para conquista."

O QuickSort é ideal para grandes datasets. Usa a estratégia **dividir para conquistar** combinada com [[recursividade]].

**Complexidade média:** O(n log n)  
**Pior caso:** O(n²) — quando o pivô é sempre o menor ou maior elemento

## Dividir para conquistar

A estratégia divide o problema em partes menores, propõe uma solução simples para a menor fração, e a aplica **recursivamente** até obter a resposta completa.

**Exemplo:** calcular 400 brigadeiros em 10 bandejas → começar por 1/4 de bandeja = 10 brigadeiros → bandeja inteira = 40 → 10 bandejas = 400.

## Regras do QuickSort

1. **Array vazio ou de um elemento** → já está ordenado (caso base)
2. **O pivô** divide o array em dois sub-arrays: menores à esquerda, maiores à direita
3. Ao final de cada partição, o pivô está em sua posição final correta
4. **Retorno:** sub-array esquerdo + pivô + sub-array direito (aplicado recursivamente)

A escolha do pivô afeta o desempenho: um pivô ruim (menor/maior da lista) degrada para O(n²).

## Implementação em C

```c
void swap(char** names, int* heights, int i, int j) {
    char* tempName = names[i];
    int tempHeight = heights[i];
    names[i] = names[j];
    heights[i] = heights[j];
    names[j] = tempName;
    heights[j] = tempHeight;
}

int partition(char** names, int* heights, int low, int high) {
    int pivot = heights[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (heights[j] > pivot) {
            i++;
            swap(names, heights, i, j);
        }
    }
    swap(names, heights, i + 1, high);
    return i + 1;
}

void quickSort(char** names, int* heights, int low, int high) {
    if (low < high) {
        int pi = partition(names, heights, low, high);
        quickSort(names, heights, low, pi - 1);
        quickSort(names, heights, pi + 1, high);
    }
}

char** sortPeople(char** names, int namesSize, int* heights,
                  int heightsSize, int* returnSize) {
    quickSort(names, heights, 0, heightsSize - 1);
    *returnSize = namesSize;
    return names;
}
```

### Fluxo da função `partition`

1. Escolhe o último elemento como pivô
2. Percorre a lista comparando quem é maior que o pivô
3. Em caso positivo, executa `swap`
4. Devolve o índice final do pivô no array reorganizado

## Comparação com Merge Sort

> "Na pior situação, o quicksort tem O(n²). No caso médio, O(n log n). O quicksort tem uma constante menor que o merge sort. Assim, ambos tendo O(n log n), o quicksort acaba sendo mais rápido." — Aditya Bhargava

**Complexidade de espaço:** O(log n) — maior que algoritmos iterativos por ser recursivo, mas controlado.

---

Anterior: [[shellsort]] | Próximo: [[arvore]]
