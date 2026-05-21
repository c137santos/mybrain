---
title: "Tree: Concept and Traversal"
date: 2024-12-02
tags: [algorithms, data-structures, c, tree]
---

# Tree: Concept and Traversal

Trees are a collection of entities called **nodes**, connected by **edges**. Each node holds a value and may have children, with no double connections between nodes. The structure is **hierarchical** — unlike [[stacks-and-queues]] and [[linked-list|linked lists]], which are linear.

## Anatomy

| Component | Description |
|---|---|
| **Root** | The topmost node (no parent) |
| **Edge** | Link between two nodes |
| **Child** | Node that has a parent |
| **Parent** | Node that has children |
| **Leaf** | Node with no children |
| **Height** | Longest path to a leaf |
| **Depth** | Path from the node to the root |

## Implementation in C

```c
typedef struct Node {
    int value;
    struct Node *left_child;
    struct Node *right_child;
} Node;

typedef struct Tree {
    Node* root;
} Tree;
```

## Binary Tree

Each node has at most **two children**. The width of each level in a balanced tree follows the pattern **2^n**.

## Traversals

### In-order (Symmetric)

Visits: left child → node → right child.

```c
void inOrder(Node* root) {
    if (root == NULL) return;
    inOrder(root->left_child);
    printf("%d ", root->value);
    inOrder(root->right_child);
}
```

### Traversal types

| Type | Visit order |
|---|---|
| **Pre-order** | node → left → right |
| **In-order** | left → node → right |
| **Post-order** | left → right → node |

## Example: LeetCode 104 — Maximum Depth of Binary Tree

Uses [[recursion]] to find the maximum depth. Achieves 100% performance (0ms) with O(n) time and space complexity.

```c
int maxDepth(struct TreeNode* root) {
    if (root == NULL) return 0;
    int left = maxDepth(root->left);
    int right = maxDepth(root->right);
    return 1 + (left > right ? left : right);
}
```

---

Previous: [[quicksort]]
