import { cacheManager } from './index.js';

// 性能監控類
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics = {
    totalRequests: 0,
    cacheHits: 0,
    cacheMisses: 0,
    averageResponseTime: 0,
    totalResponseTime: 0,
    requestTimes: [] as number[],
  };

  private constructor() {}

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // 記錄請求
  recordRequest(startTime: number, isCacheHit: boolean): void {
    const responseTime = Date.now() - startTime;

    this.metrics.totalRequests++;
    this.metrics.totalResponseTime += responseTime;
    this.metrics.requestTimes.push(responseTime);

    if (isCacheHit) {
      this.metrics.cacheHits++;
    } else {
      this.metrics.cacheMisses++;
    }

    // 計算平均響應時間
    this.metrics.averageResponseTime = this.metrics.totalResponseTime / this.metrics.totalRequests;
  }

  // 獲取性能統計
  getStats() {
    const cacheHitRate = this.metrics.totalRequests > 0 ? ((this.metrics.cacheHits / this.metrics.totalRequests) * 100).toFixed(2) : '0.00';

    const cacheStats = cacheManager.getStats();

    return {
      requests: {
        total: this.metrics.totalRequests,
        cacheHits: this.metrics.cacheHits,
        cacheMisses: this.metrics.cacheMisses,
        hitRate: `${cacheHitRate}%`,
        averageResponseTime: `${this.metrics.averageResponseTime.toFixed(2)}ms`,
      },
      cache: {
        size: cacheStats.size,
        pendingRequests: cacheStats.pendingRequests,
      },
      performance: {
        fastestRequest: Math.min(...this.metrics.requestTimes),
        slowestRequest: Math.max(...this.metrics.requestTimes),
        medianResponseTime: this.getMedianResponseTime(),
      },
    };
  }

  // 獲取中位數響應時間
  private getMedianResponseTime(): number {
    if (this.metrics.requestTimes.length === 0) return 0;

    const sorted = [...this.metrics.requestTimes].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    } else {
      return sorted[middle];
    }
  }

  // 重置統計
  reset(): void {
    this.metrics = {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      averageResponseTime: 0,
      totalResponseTime: 0,
      requestTimes: [],
    };
  }

  // 生成性能報告
  generateReport(): string {
    const stats = this.getStats();

    return `
📊 **API 性能報告**

**請求統計:**
• 總請求數: ${stats.requests.total}
• 緩存命中: ${stats.requests.cacheHits}
• 緩存未命中: ${stats.requests.cacheMisses}
• 命中率: ${stats.requests.hitRate}

**響應時間:**
• 平均響應時間: ${stats.requests.averageResponseTime}
• 最快請求: ${stats.performance.fastestRequest}ms
• 最慢請求: ${stats.performance.slowestRequest}ms
• 中位數響應時間: ${stats.performance.medianResponseTime}ms

**緩存狀態:**
• 緩存項目數: ${stats.cache.size}
• 進行中請求: ${stats.cache.pendingRequests}
    `.trim();
  }
}

// 性能監控裝飾器
export function monitorPerformance() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const monitor = PerformanceMonitor.getInstance();

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      const cacheStatsBefore = cacheManager.getStats();

      try {
        const result = await originalMethod.apply(this, args);

        const cacheStatsAfter = cacheManager.getStats();
        const isCacheHit = cacheStatsAfter.size > cacheStatsBefore.size || cacheStatsAfter.pendingRequests < cacheStatsBefore.pendingRequests;

        monitor.recordRequest(startTime, isCacheHit);
        return result;
      } catch (error) {
        monitor.recordRequest(startTime, false);
        throw error;
      }
    };

    return descriptor;
  };
}

// 導出單例實例
export const performanceMonitor = PerformanceMonitor.getInstance();
