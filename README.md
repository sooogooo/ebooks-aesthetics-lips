# 《绛唇解语花》高级交互式图片缩放查看器

## 概述

《绛唇解语花》高级交互式图片缩放查看器是专为医美行业设计的专业级图片查看和分析工具。它提供了高精度缩放、精确测量、智能标注、前后对比等专业功能，特别适用于医美案例的展示、分析和沟通。

## 核心特性

### 🔍 高精度缩放系统
- **缩放范围**: 0.1x - 10x 倍数缩放
- **平滑缩放**: 基于鼠标位置的智能缩放中心定位
- **硬件加速**: 采用GPU加速渲染，确保流畅性能
- **边界控制**: 智能边界检测和回弹效果

### 👆 多点触控支持
- **手势识别**: 双指缩放、拖拽平移
- **惯性滚动**: 自然的惯性滚动效果
- **移动端优化**: 完整的移动设备支持

### 📏 精确测量工具
- **距离测量**: 像素级精确距离计算
- **角度测量**: 支持角度计算和显示
- **多重测量**: 同时进行多个测量操作
- **测量数据**: 实时显示测量结果

### 📝 智能标注系统
- **文字标注**: 添加文字说明和标记
- **位置记忆**: 标注跟随图片缩放和移动
- **数据导出**: 支持标注数据的导入导出
- **样式定制**: 可自定义标注样式

### 🔄 专业对比功能
- **前后对比**: 专为医美案例设计的对比模式
- **并排显示**: 同时查看术前术后效果
- **滑动对比**: 通过滑动分割线对比效果
- **同步操作**: 双图片同步缩放和移动

## 文件结构

```
lips-aesthetics/
├── zoom_viewer.html     # 演示页面
├── zoom_viewer.js       # 核心功能库
├── zoom_viewer.css      # 样式表
└── README.md           # 使用说明文档
```

## 快速开始

### 基础集成

1. **引入文件**
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="zoom_viewer.css">
</head>
<body>
    <div id="my-viewer"></div>
    <script src="zoom_viewer.js"></script>
</body>
</html>
```

2. **初始化查看器**
```javascript
// 创建查看器实例
const viewer = new AdvancedZoomViewer('my-viewer', {
    minZoom: 0.1,
    maxZoom: 10,
    enableMeasurement: true,
    enableAnnotations: true,
    enableFullscreen: true
});

// 加载图片
viewer.loadImage('path/to/your/image.jpg');
```

### 高级配置

```javascript
const viewer = new AdvancedZoomViewer('viewer-container', {
    // 缩放配置
    minZoom: 0.1,              // 最小缩放倍数
    maxZoom: 10,               // 最大缩放倍数
    zoomStep: 0.1,             // 缩放步长
    wheelZoomSpeed: 0.001,     // 滚轮缩放速度
    doubleClickZoom: 2,        // 双击缩放倍数

    // 动画配置
    animationDuration: 300,    // 动画持续时间(ms)
    inertiaDecay: 0.95,        // 惯性衰减系数

    // 功能开关
    boundaryCheck: true,       // 边界检查
    enableMeasurement: true,   // 启用测量工具
    enableAnnotations: true,   // 启用标注功能
    enableFullscreen: true,    // 启用全屏模式
    enableRotation: true       // 启用旋转功能
});
```

## 操作方式

### 鼠标操作
- **滚轮缩放**: 鼠标滚轮上下滚动进行缩放
- **拖拽平移**: 按住左键拖拽移动图片
- **双击缩放**: 双击图片进行智能缩放
- **右键菜单**: 访问快捷功能菜单

### 触摸操作（移动端）
- **双指缩放**: 两指张开/收拢进行缩放
- **单指拖拽**: 单指拖拽移动图片
- **双击缩放**: 双击屏幕进行缩放

### 键盘快捷键
| 快捷键 | 功能 | 说明 |
|--------|------|------|
| `+` / `=` | 放大 | 以中心点放大图片 |
| `-` | 缩小 | 以中心点缩小图片 |
| `R` | 重置视图 | 恢复到初始状态 |
| `T` | 旋转 | 顺时针旋转90度 |
| `F` | 全屏切换 | 进入/退出全屏模式 |
| `1` | 查看模式 | 切换到普通查看模式 |
| `2` | 测量模式 | 切换到测量模式 |
| `3` | 标注模式 | 切换到标注模式 |
| `4` | 对比模式 | 切换到对比模式 |
| `Esc` | 退出全屏 | 退出全屏模式 |

## API 参考

### 构造函数
```javascript
new AdvancedZoomViewer(containerId, options)
```

**参数**:
- `containerId` (string): 容器元素的ID
- `options` (object): 配置选项对象

### 主要方法

#### 图片操作
```javascript
// 加载图片
viewer.loadImage(imageUrl, beforeImageUrl?)

// 缩放操作
viewer.zoomIn()                    // 放大
viewer.zoomOut()                   // 缩小
viewer.zoomAtPoint(x, y, delta)    // 在指定点缩放
viewer.zoomToFit()                 // 缩放至适应窗口

// 视图操作
viewer.resetView()                 // 重置视图
viewer.rotate()                    // 旋转90度
```

#### 模式切换
```javascript
// 设置操作模式
viewer.setMode('view')      // 查看模式
viewer.setMode('measure')   // 测量模式
viewer.setMode('annotate')  // 标注模式
viewer.setMode('compare')   // 对比模式
```

#### 测量功能
```javascript
// 清除所有测量
viewer.clearMeasurements()

// 获取测量数据
const measurements = viewer.state.measurements
```

#### 标注功能
```javascript
// 清除所有标注
viewer.clearAnnotations()

// 导出标注数据
const annotationData = viewer.exportAnnotations()

// 导入标注数据
viewer.importAnnotations(jsonData)

// 移除指定标注
viewer.removeAnnotation(annotationId)
```

#### 全屏操作
```javascript
// 切换全屏
viewer.toggleFullscreen()

// 进入全屏
viewer.enterFullscreen()

// 退出全屏
viewer.exitFullscreen()
```

#### 状态管理
```javascript
// 获取当前状态
const state = viewer.getState()

// 设置状态
viewer.setState({
    zoom: 2,
    x: 100,
    y: 100,
    rotation: 90
})
```

#### 工具功能
```javascript
// 截图保存
const dataUrl = viewer.captureScreenshot()

// 销毁查看器
viewer.destroy()
```

## 使用场景

### 医美案例展示
```javascript
// 创建专用于案例展示的查看器
const caseViewer = new AdvancedZoomViewer('case-display', {
    enableMeasurement: true,
    enableAnnotations: true,
    enableFullscreen: true
});

// 加载术前术后对比图
caseViewer.loadImage('after.jpg', 'before.jpg');
caseViewer.setMode('compare');
```

### 精确测量分析
```javascript
// 启用测量功能
const measureViewer = new AdvancedZoomViewer('measure-tool', {
    enableMeasurement: true,
    minZoom: 0.5,
    maxZoom: 20  // 高倍缩放用于精确测量
});

measureViewer.setMode('measure');
```

### 标注和说明
```javascript
// 添加标注功能
const annotateViewer = new AdvancedZoomViewer('annotate-tool', {
    enableAnnotations: true,
    enableMeasurement: false
});

annotateViewer.setMode('annotate');

// 导出标注数据供后续使用
document.getElementById('export-btn').onclick = () => {
    const data = annotateViewer.exportAnnotations();
    // 保存到服务器或本地存储
    localStorage.setItem('annotations', data);
};
```

## 样式定制

### CSS 变量定制
```css
:root {
    --bg-primary: #1a1a1a;      /* 主背景色 */
    --bg-secondary: #2a2a2a;    /* 次背景色 */
    --text-primary: #ffffff;    /* 主文字色 */
    --accent-primary: #ff4757;  /* 主题色 */
    --accent-secondary: #4ecdc4; /* 辅助色 */
}
```

### 自定义主题
```css
/* 浅色主题 */
.zoom-viewer.light-theme {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #333333;
    --border-color: rgba(0,0,0,0.1);
}

/* 高对比度主题 */
.zoom-viewer.high-contrast {
    --bg-primary: #000000;
    --text-primary: #ffffff;
    --accent-primary: #ffff00;
}
```

## 性能优化

### 图片优化建议
- **图片格式**: 优先使用 WebP 格式，回退到 JPEG
- **图片尺寸**: 根据显示需求选择合适的分辨率
- **压缩质量**: 平衡文件大小和图片质量

### 内存管理
```javascript
// 销毁不再使用的查看器实例
viewer.destroy();

// 及时清理大型数据
viewer.clearMeasurements();
viewer.clearAnnotations();
```

### 移动端优化
```javascript
// 移动端专用配置
const mobileViewer = new AdvancedZoomViewer('mobile-viewer', {
    wheelZoomSpeed: 0.002,     // 提高触摸敏感度
    animationDuration: 200,    // 减少动画时间
    inertiaDecay: 0.9         // 增强惯性效果
});
```

## 浏览器兼容性

### 支持的浏览器
- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **移动浏览器**: iOS Safari 12+, Chrome Mobile 60+

### 功能支持检测
```javascript
// 检测全屏支持
if (document.fullscreenEnabled) {
    // 启用全屏功能
    viewer.config.enableFullscreen = true;
}

// 检测触摸支持
if ('ontouchstart' in window) {
    // 启用触摸优化
    viewer.config.touchOptimized = true;
}
```

## 常见问题

### Q: 图片加载失败怎么办？
A: 查看器会自动显示错误信息。请检查图片URL是否正确，以及是否存在跨域问题。

### Q: 如何处理大尺寸图片？
A: 查看器采用了多种优化技术：
- GPU硬件加速
- 分层渲染
- 智能缓存
- 按需加载

### Q: 移动端性能不佳怎么优化？
A: 建议：
- 降低 `animationDuration`
- 调整 `wheelZoomSpeed`
- 禁用不必要的功能
- 使用适当分辨率的图片

### Q: 如何自定义标注样式？
A: 通过CSS覆盖默认样式：
```css
.annotation-marker .marker-pin {
    background: #your-color;
}

.annotation-marker .marker-text {
    background: rgba(0,0,0,0.9);
    color: #ffffff;
}
```

## 更新日志

### v1.0.0 (2024-09-20)
- 初始版本发布
- 完整的缩放和平移功能
- 测量工具和标注功能
- 前后对比模式
- 全屏支持
- 移动端优化
- 键盘快捷键支持

## 许可证

本项目基于 MIT 许可证开源。详见 LICENSE 文件。

## 技术支持

如有技术问题或功能建议，请通过以下方式联系：

- **项目地址**: GitHub Repository
- **文档地址**: 详细文档链接
- **反馈邮箱**: support@lips-aesthetics.com

---

**《绛唇解语花》** - 专业医美案例展示解决方案