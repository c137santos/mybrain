---
title: "Selection Sort"
date: 2024-10-18
tags: [algorithms, sorting, c]
---

# Selection Sort

Selection Sort is extremely simple but inefficient. It works well only for small amounts of data.

**Time complexity:** O(n²)

## How it works

A perfect analogy is the **round-robin** system in football: each element faces all others to determine who is the smallest.

### Steps

a) Select the first element  
b) Compare it against all others, looking for the smallest (for ascending order)  
c) Swap positions when a smaller element is found  
d) Move to the next element — the previous one is now sorted  

**Key point:** you must scan the entire list each time. The maximum number of swaps involving a single element is **n - 1**.

## Implementation in C

```c
void selectionSort(int list[], int start, int end) {
    int i, j;
    for (i = start; i < end; i++) {
        int min = i;
        for (j = i + 1; j <= end; j++) {
            if (list[j] < list[min]) {
                min = j;
            }
        }
        int temp = list[i];
        list[i] = list[min];
        list[min] = temp;
    }
}
```

## Two nested `for` loops

The algorithm requires exactly **2 nested loops** — this nesting is responsible for the O(n²) complexity.

- **Outer loop:** elects each position as the provisional round minimum
- **Inner loop:** scans the remainder, comparing the current element against all subsequent ones

## Example: LeetCode 2418 — Sort the People

Sort names by height in descending order. Here we search for the **largest** value instead of the smallest:

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

Previous: [[stacks-and-queues]] | Next: [[insertion-sort]]
