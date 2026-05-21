---
title: "Stacks and Queues"
date: 2024-10-04
tags: [algorithms, data-structures, c, stack, queue]
---

# Stacks and Queues

## Stack

A stack follows the **LIFO — Last In, First Out** principle: the element removed is the one that has been in the structure the least time.

Using [[linked-list|linked lists]] avoids overflow issues present in array-based implementations.

### Operations

| Operation | Description |
|---|---|
| `push(item)` | Adds element to the top |
| `pop()` | Removes element from the top |
| `peek()` | Returns the top without removing |
| `isEmpty()` | Checks if empty |

### Technical detail: pointer to pointer

Using `Node**` lets you modify the address of the first node, enabling insertion at the head without losing the reference:

```c
void push(Node** top, int value) {
    Node* newNode = malloc(sizeof(Node));
    newNode->value = value;
    newNode->next = *top;
    *top = newNode;
}
```

## Queue

A queue follows the **FIFO — First In, First Out** principle: the oldest element is the first to leave.

### Operations

| Operation | Description |
|---|---|
| `add(item)` | Adds to the end |
| `remove()` | Removes from the front |
| `peek()` | Returns the front without removing |
| `isEmpty()` | Checks if empty |

### Two-pointer structure

```
HEAD → [A] → [B] → [C] ← TAIL
```

- **HEAD:** points to the front
- **TAIL:** points to the back
- The queue is empty when HEAD and TAIL meet

## When to use each

- **Stack:** recursive problems, context control, undo/redo
- **Queue:** graph algorithms (especially BFS — Breadth-First Search), processing in arrival order

---

Previous: [[linked-list]] | Next: [[selection-sort]]
