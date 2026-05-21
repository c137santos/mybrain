---
title: "ShellSort"
date: 2024-11-18
tags: [algorithms, sorting, c]
---

# ShellSort

> "An [[insertion-sort]] with a rabbit jumping in the middle."

ShellSort pre-organizes the array with larger gaps before running a final insertion sort, avoiding the cost of pushing elements across long distances.

**Advantage over InsertionSort:** while Insertion Sort makes many consecutive copies, ShellSort swaps distant positions, significantly reducing the number of operations.

## The rabbit metaphor

Imagine a rabbit hopping over the list with fixed jumps (the **gap**). As the rabbit tires, the jumps get shorter — until the gap reaches 1, at which point the algorithm becomes a regular insertion sort, but the list is already nearly sorted.

## Known gap sequences

| Name | Sequence |
|---|---|
| Hibbard | 2^k − 1 |
| Knuth | (3^k − 1) / 2 |
| Sedgewick | 1, 5, 19, 41, 109… |
| Ciura (empirical) | 1, 4, 10, 23, 57, 132, 301, 701, 1750 |

## Implementation in C (Knuth)

```c
char** sortPeople(char** names, int namesSize, int* heights,
                  int heightsSize, int* returnSize) {
    int h = 1;
    while (h <= heightsSize / 3) {
        h = h * 3 + 1;  // Knuth sequence
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

## Performance

| Algorithm | Time (LeetCode) |
|---|---|
| Selection Sort | 45ms |
| Insertion Sort | 15ms |
| **Shell Sort** | **0ms** |

ShellSort hit 0ms (top 100% performance). Memory usage was slightly higher, but the difference is minimal (~0.32MB).

---

Previous: [[insertion-sort]] | Next: [[quicksort]]
