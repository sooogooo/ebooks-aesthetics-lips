# 性能优化指南

## 概述

本文档详细说明了《绛唇解语花》项目的性能优化方案和最佳实践。

## 性能现状分析

### 文件大小统计

**大型 HTML 文件（>50KB）**
- `doctor-skill-assessment.html` - 51KB
- `emergency-response-simulation.html` - 50KB
- `patient-satisfaction-survey.html` - 47KB

**中型 HTML 文件（30-50KB）**
- `patient-satisfaction-survey-print.html` - 36KB
- `preoperative-risk-assessment.html` - 35KB
- `emergency-response-checklist-print.html` - 34KB
- `lip-assessment-test.html` - 33KB
- `doctor-skill-assessment-print.html` - 31KB
- `index.html` - 30KB

**小型 HTML 文件（<30KB）**
- `reader.html` - 27KB
- `preoperative-risk-assessment-print.html` - 24KB
- `lip-assessment-scale-print.html` - 23KB
- `topic-check.html` - 12KB
- `removal-report.html` - 11KB

### 资源类型分布

```
HTML 文件:  14 个文件，总大小约 415KB
CSS 文件:   1 个文件 (navigation.css)
JavaScript: 1 个文件 (navigation.js)
Markdown:   30+ 个文件（章节内容）
```

## 已实施的优化措施

### 1. 服务器配置优化 (.htaccess)

#### Gzip 压缩
- ✅ 启用所有文本资源的 Gzip 压缩
- ✅ 预期压缩率：60-80%
- ✅ 对 HTML/CSS/JS/Markdown 自动压缩

**效果预估：**
- HTML 文件：51KB → 约 13KB（压缩75%）
- CSS 文件：压缩70-80%
- JS 文件：压缩65-75%

#### 浏览器缓存策略

**短期缓存（1小时）：**
- HTML 文件
- XML/JSON 配置文件

**中期缓存（1周）：**
- Markdown 内容文件

**长期缓存（1年）：**
- CSS 样式表
- JavaScript 文件
- 图片资源
- 字体文件

**缓存控制：**
- HTML: `public, must-revalidate, max-age=3600`
- CSS/JS: `public, immutable, max-age=31536000`
- 图片: `public, immutable, max-age=31536000`

### 2. 资源加载优化

#### 关键资源预加载
```html
<!-- index.html -->
<link rel="preload" href="/css/navigation.css" as="style">

<!-- reader.html -->
<link rel="preload" href="/css/navigation.css" as="style">
<link rel="preload" href="/js/navigation.js" as="script">
```

#### 字体优化
- 使用系统字体栈，减少外部字体请求
- 字体栈：`'PingFang SC', 'Microsoft YaHei', 'Source Han Sans CN', sans-serif`

### 3. 代码优化

#### JavaScript 优化
- ✅ 模块化设计
- ✅ 事件委托减少监听器
- ✅ 防抖和节流处理
- ✅ 延迟初始化非关键功能

#### CSS 优化
- ✅ 使用 CSS 变量减少重复
- ✅ 响应式设计优化
- ✅ 减少选择器复杂度
- ✅ 使用硬件加速动画（transform, opacity）

### 4. 图片优化策略

**当前状态：**
- 使用外部CDN加载图标（https://docs.bccsw.cn/）
- SVG 图标内联到 HTML（减少请求）

**建议改进：**
- 使用 WebP 格式（节省30-50%大小）
- 实施懒加载（IntersectionObserver）
- 提供响应式图片（srcset）

## 性能指标

### 目标性能指标

| 指标 | 目标值 | 当前状态 |
|------|--------|----------|
| FCP (首次内容绘制) | < 1.5s | ✅ 已优化 |
| LCP (最大内容绘制) | < 2.5s | ✅ 已优化 |
| TTI (可交互时间) | < 3.5s | ✅ 已优化 |
| CLS (累积布局偏移) | < 0.1 | ✅ 已优化 |
| FID (首次输入延迟) | < 100ms | ✅ 已优化 |

### Lighthouse 评分目标

```
性能 (Performance):    90+  ⭐⭐⭐⭐⭐
无障碍 (Accessibility): 95+  ⭐⭐⭐⭐⭐
最佳实践 (Best Practices): 95+  ⭐⭐⭐⭐⭐
SEO:                   100  ⭐⭐⭐⭐⭐
```

## 高级优化建议

### 1. HTTP/2 和 HTTP/3
- 启用 HTTP/2 多路复用
- 考虑升级到 HTTP/3（QUIC）
- 减少域名分片，利用 HTTP/2 优势

### 2. CDN 加速
```
推荐 CDN 提供商：
- Cloudflare (免费计划可用)
- 阿里云 CDN
- 腾讯云 CDN
- AWS CloudFront
```

**CDN 配置建议：**
- 静态资源全部走 CDN
- 设置合理的缓存时间
- 启用 Brotli 压缩
- 启用 HTTP/2 Server Push

### 3. 代码分割和懒加载

#### JavaScript 代码分割
```javascript
// 示例：动态导入非关键功能
const loadChartLibrary = async () => {
    if (document.querySelector('.chart-container')) {
        const { Chart } = await import('./chart.min.js');
        // 使用 Chart
    }
};
```

#### 图片懒加载
```html
<img
    src="placeholder.jpg"
    data-src="actual-image.jpg"
    loading="lazy"
    alt="描述"
>
```

```javascript
// IntersectionObserver 实现
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            imageObserver.unobserve(img);
        }
    });
});
```

### 4. 服务工作线程 (Service Worker)

**离线缓存策略：**
```javascript
// service-worker.js 示例
const CACHE_NAME = 'lips-aesthetics-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/reader.html',
    '/css/navigation.css',
    '/js/navigation.js',
    '/00_preface.md',
    // ... 其他关键资源
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
```

### 5. 资源提示

```html
<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="https://docs.bccsw.cn">

<!-- 预连接 -->
<link rel="preconnect" href="https://docs.bccsw.cn">

<!-- 预加载关键资源 -->
<link rel="preload" href="/css/navigation.css" as="style">
<link rel="preload" href="/js/navigation.js" as="script">

<!-- 预获取下一页资源 -->
<link rel="prefetch" href="/reader.html?chapter=01_cultural_aesthetics.md">
```

### 6. 关键 CSS 内联

对于首屏关键样式，考虑内联到 HTML 中：

```html
<head>
    <style>
        /* 关键 CSS - 首屏必需样式 */
        :root {
            --primary-color: #8B4513;
            /* ... */
        }
        body {
            font-family: 'PingFang SC', sans-serif;
            /* ... */
        }
        .header { /* ... */ }
    </style>

    <!-- 非关键 CSS 延迟加载 -->
    <link rel="preload" href="/css/navigation.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="/css/navigation.css"></noscript>
</head>
```

### 7. 数据库优化（如果使用）

- 实施查询缓存
- 添加适当的索引
- 使用连接池
- 实施数据分页

## 性能监控

### 推荐监控工具

**开发阶段：**
- Chrome DevTools (Performance, Network)
- Lighthouse
- WebPageTest
- PageSpeed Insights

**生产阶段：**
- Google Analytics (页面加载时间)
- Sentry (错误监控)
- New Relic / Datadog (APM)
- CloudFlare Analytics

### 关键性能指标监控

```javascript
// 使用 Performance API 监控
window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];

    console.log('性能指标：', {
        DNS查询: perfData.domainLookupEnd - perfData.domainLookupStart,
        TCP连接: perfData.connectEnd - perfData.connectStart,
        请求响应: perfData.responseEnd - perfData.requestStart,
        DOM解析: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        页面加载: perfData.loadEventEnd - perfData.loadEventStart
    });
});

// 监控资源加载
const resourceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.duration > 1000) {
            console.warn('慢资源:', entry.name, entry.duration + 'ms');
        }
    }
});
resourceObserver.observe({ entryTypes: ['resource'] });
```

## 移动端优化

### 触摸优化
```css
/* 提升触摸响应 */
.button {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
}
```

### 视口优化
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
```

### 减少重绘和回流
- 使用 `transform` 和 `opacity` 做动画
- 批量 DOM 操作
- 使用 `requestAnimationFrame`
- 避免强制同步布局

## 实施检查清单

- [x] 启用 Gzip/Brotli 压缩
- [x] 配置浏览器缓存
- [x] 添加缓存控制头
- [x] 预加载关键资源
- [x] 优化字体加载
- [x] 代码模块化
- [ ] 实施代码分割
- [ ] 添加图片懒加载
- [ ] 启用 Service Worker
- [ ] 配置 CDN
- [ ] 实施性能监控
- [ ] 优化移动端体验

## 测试和验证

### 性能测试步骤

1. **本地测试**
   ```bash
   # 启动本地服务器
   npm run serve

   # 在浏览器中测试
   http://localhost:28100
   ```

2. **Lighthouse 审计**
   - Chrome DevTools → Lighthouse
   - 选择 "Performance" + "Accessibility" + "Best Practices" + "SEO"
   - 运行审计并查看报告

3. **WebPageTest 测试**
   - 访问 https://www.webpagetest.org
   - 输入网站 URL
   - 选择测试位置和设备
   - 查看详细报告

4. **真实设备测试**
   - iOS Safari
   - Android Chrome
   - 低端设备测试

### 性能回归测试

每次发布前检查：
- [ ] Lighthouse 性能评分 > 90
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] 首屏加载时间 < 3s

## 持续优化

### 定期审查（每月）
1. 检查 Web Vitals 指标
2. 分析用户体验报告
3. 审查资源大小变化
4. 清理未使用的代码
5. 更新依赖库

### 长期优化目标
1. 实现完整的离线支持
2. 优化至 Lighthouse 100 分
3. 减小包体积 50%
4. 提升移动端体验到桌面级

## 参考资源

- [Web.dev - 性能优化](https://web.dev/performance/)
- [MDN - 性能优化](https://developer.mozilla.org/zh-CN/docs/Web/Performance)
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

---

**最后更新**: 2025-10-12
**维护者**: 重庆联合丽格科技有限公司
