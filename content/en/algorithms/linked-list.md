---
title: "How I learned Linked List"
date: 2024-09-23
tags: [algorithms, data-structures, c, linked-list]
---

# How I learned Linked List

> "A Linked List is a linear data structure composed of nodes"

## Basic structure

```c
struct ListNode {
    int val;
    struct ListNode* next;
};
```

## LinkedList vs Array

| Operation | LinkedList | Array |
|---|---|---|
| Access | O(n) — sequential traversal | O(1) — indexed access |
| Insert/Delete | O(1) | O(n) — shift/reallocation |
| Memory | Non-contiguous | Contiguous allocation |

## Pointer notation in C

- `newNode` → pointer (memory address)
- `*newNode` → dereference (value pointed to)
- `->` → access through pointer
- `.` → direct struct access

## Head vs Headless

**With head:** a special sentinel node marking the start, even when the list is empty.

**Headless:** a null pointer represents an empty list.

## Core operations

### Insertion

Before inserting, two elements must point to the same `next` — this prevents losing references.

```c
void insertNodeInList(int data, struct ListNode* p) {
    struct ListNode *newNode = malloc(sizeof(struct ListNode));
    newNode->data = data;
    newNode->next = p->next;
    p->next = newNode;
}
```

### Deletion

Redirects pointers and frees memory, being careful not to access NULL.

```c
struct ListNode* removeElements(struct ListNode* head, int forbiddenVal) {
    while (head != NULL && head->val == forbiddenVal) {
        struct ListNode* temp = head;
        head = head->next;
        free(temp);
    }
    if (head == NULL) return NULL;
    head->next = removeElements(head->next, forbiddenVal);
    return head;
}
```

### Merging two sorted lists

Uses [[recursion]] to compare and connect elements from both lists while maintaining order.

### Swap Nodes in Pairs

Reverses positions two at a time by swapping only pointers:

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

Previous: [[recursion]] | Next: [[stacks-and-queues]]
