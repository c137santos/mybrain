---
title: "Recursion"
date: 2024-09-10
tags: [algorithms, data-structures, c, recursion]
---

# Recursion

> "The real solution to recursion lies in the stop conditions we find along the way"

Recursion is the technique of identifying the simplest case of a problem, proposing a direct solution for it, and using that result to handle progressively more complex cases.

## How to structure a recursion

Break the process into three steps:

**a) Stop condition:** result(s) that signal the end of the problem (success, failure, or reaching the base case).

**b) Simplest input:** the happy path of resolution.

**c) Base algorithm:** the direct solution applied to the simplest input.

Stop conditions are essential to avoid infinite loops.

## Practical example: Power of Two (LeetCode)

**Problem:** determine if a number is a power of 2.

### Stop conditions

1. `n ≤ 0` → return false
2. `n == 1` → return true (1 is a power of 2)
3. `n > 1` → check divisibility by 2

```c
bool isPowerOfTwo(int n) {
    if (n == 1) return true;
    if (n <= 0 || n % 2 != 0) return false;
    return isPowerOfTwo(n / 2);
}
```

## Every recursion is a stack

Recursion works like a call stack. Each call creates a new memory space. When the stop condition is reached, solutions are popped off the stack.

**Key rule:** stop conditions must come **before** the recursive call to avoid stack overflow.

## Impact of operation ordering

Where operations appear (before or after the recursive call) significantly affects the output.

**Operation before recursion** — easily converted to iteration:

```c
void isPowerOfTwo(int n) {
    if (n == 1) { printf("true\n"); return; }
    if (n <= 0 || n % 2 != 0) { printf("false\n"); return; }
    isPowerOfTwo(n / 2);
}
```

**Operation after recursion** — function depends on the unwinding of the stack:

```python
def podio(lista):
    if len(lista) > 0:
        print(lista[0])
        podio(lista[1:])
        print(lista[0])

podio([1, 2, 3, 4])
# Output: 1 2 3 4 4 3 2 1
```

This pattern clearly shows the descent (stacking) and ascent (unstacking) of recursion.

## Equivalent iterative version

```c
bool isPowerOfTwo(int n) {
    if (n < 1) return false;
    while (n > 1) {
        if (n % 2 != 0) return false;
        n /= 2;
    }
    return true;
}
```

---

Next: [[linked-list]]
