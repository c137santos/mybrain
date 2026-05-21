---
title: "Melhores Práticas de Desempenho do Amazon S3"
date: 2025-01-02
tags: [aws, s3, cloud, design-patterns, performance]
---

# Melhores Práticas de Desempenho do Amazon S3

Resumo do whitepaper da AWS sobre otimização de desempenho do S3. Aplicações podem alcançar **milhares de transações por segundo** com escalabilidade automática para altas taxas de requisição.

**Limites por prefixo:**
- 3.500 requisições PUT/COPY/POST/DELETE/s
- 5.500 requisições GET/HEAD/s

Paralelizando leituras através de múltiplos prefixos → até **55.000 leituras/s**.

## 1. Diretrizes de desempenho

### Medir antes de otimizar

Considere throughput de rede, CPU e DRAM. Analise tempo de DNS, latência e velocidade de transferência com ferramentas HTTP.

### Escalonar conexões horizontalmente

O S3 não impõe limite de conexões por bucket — distribua requisições entre múltiplas conexões.

### Busca por intervalo de bytes (Range GETs)

```
curl -H "Range: bytes=1500-1999" -o arquivo.dat http://exemplo.com/arquivo_grande.dat
```

Tamanhos típicos: **8MB ou 16MB** por requisição. Conexões simultâneas acessam intervalos diferentes do mesmo objeto.

### Retry com aggressive timeouts

Timeouts agressivos mantêm latência consistente — uma requisição lenta provavelmente terá sucesso rapidamente na retentativa por seguir um caminho diferente.

### EC2 e S3 na mesma região

Reduz latência de rede e custos de transferência.

### S3 Transfer Acceleration

Minimiza latência geográfica usando edge locations do CloudFront. Use a **Speed Comparison Tool** para avaliar o ganho em cada região.

## 2. Padrões de design para desempenho

### Cache para conteúdo frequentemente acessado

| Serviço | Caso de uso |
|---|---|
| **CloudFront** | CDN — cache em pontos de presença globais |
| **ElastiCache** | Cache em memória — reduz latência de GET |
| **MediaStore** | Fluxos de vídeo e mídia |

ElastiCache requer modificação da lógica da aplicação: popular cache e verificar antes de ir ao S3.

### Timeouts e retentativas por tamanho de objeto

| Tamanho | Estratégia |
|---|---|
| **> 128 MB** | Monitorar taxa de transferência; retentar os 5% mais lentos |
| **< 512 KB** | Retentar após 2s; se necessário, backoff exponencial (2s → 4s) |
| **Tamanho fixo** | Identificar 1% mais lento; uma única retentativa costuma resolver |

### Escalonamento horizontal e paralelização

Recomendações para transferências de alta taxa:

1. Emitir requisições GET/PUT diretamente via AWS SDKs
2. Requisições concorrentes por intervalos de 8–16 MB
3. **Uma requisição por 85–90 MB/s de throughput desejado**
4. Para saturar uma NIC de 10 Gb/s → ~15 requisições concorrentes
5. Começar com uma requisição e aumentar conforme medição

Para REST API: usar pool de conexões HTTP e **reutilizar conexões** — elimina TCP slow-start e SSL handshakes repetidos.

**Atenção ao DNS:** garantir que requisições se distribuam por amplo pool de IPs do S3. Resolvers que reutilizam um único IP não aproveitam o balanceamento de carga.

### Transfer Acceleration para distâncias globais

**Ideal para:** transferências entre continentes, conexões rápidas, objetos grandes.

**Como funciona:** dados chegam à edge location mais próxima e são roteados ao S3 pela rede privada otimizada da AWS.

Cobrança apenas quando o Transfer Acceleration efetivamente melhora o upload.
