---
title: "Recursividade"
date: 2024-09-10
tags: [algoritmos, estruturas-de-dados, c, recursão]
---

# Recursividade

> "A verdadeira solução da recursão são os critérios de parada que encontramos pelo caminho"

A recursão é a técnica de identificar o caso mais simples de um problema, propor uma solução direta para ele, e usar esse resultado para lidar com casos progressivamente mais complexos.

## Como estruturar uma recursão

Divida o processo em três passos:

**a) Critério de parada:** resultado(s) que indicam o fim do problema (sucesso, falha ou chegada ao caso base).

**b) Input mais simples:** o caminho feliz de resolução.

**c) Algoritmo base:** a solução direta aplicada ao input mais simples.

Os critérios de parada são essenciais para evitar loops infinitos.

## Exemplo prático: Power of Two (LeetCode)

**Problema:** determinar se um número é potência de 2.

### Critérios de parada

1. `n ≤ 0` → retorna falso
2. `n == 1` → retorna verdadeiro (1 é potência de 2)
3. `n > 1` → verificar divisibilidade por 2

```c
bool isPowerOfTwo(int n) {
    if (n == 1) return true;
    if (n <= 0 || n % 2 != 0) return false;
    return isPowerOfTwo(n / 2);
}
```

## Toda recursão é uma pilha

A recursão funciona como uma pilha de execução (call stack). Cada chamada cria um novo espaço de memória. Quando o critério de parada é atingido, as soluções são desempilhadas.

**Regra importante:** os critérios de parada devem vir **antes** da chamada recursiva para evitar stack overflow.

## Impacto da ordem das operações

A posição das operações (antes ou depois da chamada recursiva) afeta o resultado da função.

**Operação antes da recursão** — padrão facilmente convertível para iteração:

```c
void isPowerOfTwo(int n) {
    if (n == 1) { printf("true\n"); return; }
    if (n <= 0 || n % 2 != 0) { printf("false\n"); return; }
    isPowerOfTwo(n / 2);
}
```

**Operação depois da recursão** — a função depende do retorno da pilha:

```python
def podio(lista):
    if len(lista) > 0:
        print(lista[0])
        podio(lista[1:])
        print(lista[0])

podio([1, 2, 3, 4])
# Output: 1 2 3 4 4 3 2 1
```

Esse padrão demonstra o empilhamento (descida) e o desempilhamento (subida) da recursão.

## Versão iterativa equivalente

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

Próximo: [[linked-list]]
