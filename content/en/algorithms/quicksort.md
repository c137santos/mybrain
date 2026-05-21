---
title: "QuickSort"
date: 2024-11-27
tags: [algorithms, sorting, c]
---

# QuickSort

> "QuickSort is a constant battle to conquer."

QuickSort is ideal for large datasets. It uses the **divide and conquer** strategy combined with [[recursion]].

**Average complexity:** O(n log n)  
**Worst case:** O(n²) — when the pivot is always the smallest or largest element

## Divide and conquer

The strategy splits the problem into smaller parts, proposes a simple solution for the smallest fraction, and applies it **recursively** until the full answer is obtained.

## QuickSort rules

1. **Empty or single-element array** → already sorted (base case)
2. **The pivot** splits the array into two sub-arrays: smaller elements on the left, larger on the right
3. After each partition, the pivot is in its final correct position
4. **Return:** left sub-array + pivot + right sub-array (applied recursively)

Pivot choice affects performance: a poor pivot (smallest/largest of the list) degrades to O(n²).

## Implementation in C

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

### How `partition` works

1. Picks the last element as pivot
2. Scans the list comparing who is greater than the pivot
3. Swaps when a larger element is found
4. Returns the pivot's final index in the reorganized array

## Comparison with Merge Sort

> "In the worst case, quicksort runs in O(n²). On average, O(n log n). Quicksort has a smaller constant than merge sort. So with both at O(n log n), quicksort ends up faster." — Aditya Bhargava

**Space complexity:** O(log n) — higher than iterative algorithms due to recursion, but controlled.

---

Previous: [[shellsort]] | Next: [[tree]]
