---
title: "Insertion Sort"
date: 2024-10-30
tags: [algorithms, sorting, c]
---

# Insertion Sort

Insertion Sort is efficient for sorting a **small** number of elements. It works by "pushing" elements until a pivot finds its correct position — like inserting a playing card into the right spot in your hand.

**Complexity:** O(n²) in the general case; O(n) when the list is already sorted.

## Two main actors

- **Pivot:** the element under analysis that will be placed in order (position `i`)
- **Key:** a moving index that walks backwards through predecessors to find where the pivot fits (starts at `i-1`)

## Rules

1. Any array with 0 or 1 element is already sorted
2. The pivot yields its position so larger elements can be "pushed" forward
3. Analysis starts at the second position — the first element is considered sorted
4. The key stops when it reaches index 0 or finds an element larger than the pivot

## Implementation in C

```c
void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int pivot = arr[i];
        int key = i - 1;
        while (key >= 0 && arr[key] > pivot) {
            arr[key + 1] = arr[key];
            key--;
        }
        arr[key + 1] = pivot;
    }
}
```

## Example: LeetCode 2418 — Sort the People

Sort names by height in descending order:

```c
char** sortPeople(char** names, int namesSize, int* heights,
                  int heightsSize, int* returnSize) {
    for (int i = 1; i < heightsSize; i++) {
        int pivot = heights[i];
        char* namePivot = names[i];
        int key = i - 1;

        while (key >= 0 && heights[key] < pivot) {
            heights[key + 1] = heights[key];
            names[key + 1] = names[key];
            key--;
        }

        heights[key + 1] = pivot;
        names[key + 1] = namePivot;
    }
    *returnSize = namesSize;
    return names;
}
```

**Performance:** 15ms on LeetCode — faster than [[selection-sort]] (47ms).

## Space complexity

O(1) — constant. No extra memory beyond temporary variables.

---

Previous: [[selection-sort]] | Next: [[shellsort]]
