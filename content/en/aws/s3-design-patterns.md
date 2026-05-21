---
title: "Amazon S3 Performance Best Practices"
date: 2025-01-02
tags: [aws, s3, cloud, design-patterns, performance]
---

# Amazon S3 Performance Best Practices

Summary of the AWS whitepaper on S3 performance optimization. Applications can achieve **thousands of transactions per second** with automatic scaling for high request rates.

**Per-prefix limits:**
- 3,500 PUT/COPY/POST/DELETE requests/s
- 5,500 GET/HEAD requests/s

Parallelizing reads across multiple prefixes → up to **55,000 reads/s**.

## 1. Performance guidelines

### Measure before optimizing

Consider network throughput, CPU, and DRAM. Analyze DNS time, latency, and transfer speed with HTTP analysis tools.

### Scale connections horizontally

S3 imposes no connection limit per bucket — distribute requests across multiple connections.

### Range GETs (byte-range fetches)

```
curl -H "Range: bytes=1500-1999" -o file.dat http://example.com/large_file.dat
```

Typical sizes: **8MB or 16MB** per request. Concurrent connections access different byte ranges of the same object.

### Retry with aggressive timeouts

Aggressive timeouts keep latency consistent — a slow request will likely succeed quickly on retry by taking a different path.

### EC2 and S3 in the same region

Reduces network latency and data transfer costs.

### S3 Transfer Acceleration

Minimizes geographic latency using CloudFront edge locations. Use the **Speed Comparison Tool** to evaluate gains per region.

## 2. Design patterns for performance

### Caching frequently accessed content

| Service | Use case |
|---|---|
| **CloudFront** | CDN — cache at global points of presence |
| **ElastiCache** | In-memory cache — reduces GET latency |
| **MediaStore** | Video streams and media distribution |

ElastiCache requires modifying application logic: populate cache and check it before hitting S3.

### Timeouts and retries by object size

| Size | Strategy |
|---|---|
| **> 128 MB** | Monitor transfer rate; retry the slowest 5% |
| **< 512 KB** | Retry after 2s; if needed, exponential backoff (2s → 4s) |
| **Fixed size** | Identify slowest 1%; a single retry usually resolves it |

### Horizontal scaling and parallelization

Recommendations for high-throughput transfers:

1. Issue GET/PUT requests directly via AWS SDKs
2. Concurrent requests by 8–16 MB byte ranges
3. **One request per 85–90 MB/s of desired throughput**
4. To saturate a 10 Gb/s NIC → ~15 concurrent requests
5. Start with one request and scale up as you measure

For REST API: use an HTTP connection pool and **reuse connections** — eliminates repeated TCP slow-start and SSL handshakes.

**DNS warning:** ensure requests are distributed across S3's broad IP pool. Resolvers that reuse a single IP miss the load balancing benefit.

### Transfer Acceleration for global distances

**Ideal for:** cross-continent transfers, fast connections, large objects.

**How it works:** data arrives at the nearest edge location and is routed to S3 over AWS's private optimized network.

You're only charged when Transfer Acceleration actually improves the upload speed.
