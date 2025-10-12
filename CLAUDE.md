# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**《绛唇解语花》医美专业指导书** - 一本专注于唇部美学的综合性医美电子书，结合传统东方美学与现代医学美容技术。

### 项目信息

- **项目名称**: 《绛唇解语花》医美专业指导书
- **项目类型**: 交互式电子书 + 专业评估工具系统
- **主题领域**: 唇部美学医疗美容
- **GitHub 仓库**: https://github.com/sooogooo/ebooks-aesthetics-book
- **公司**: 重庆联合丽格科技有限公司
- **ICP 备案**: 渝ICP备2024023473号

### 核心特色

- ✅ **完整的理论体系**: 12章专业内容 (00-11)
- ✅ **交互式评估工具**: 5大专业评估系统
- ✅ **双阅读器架构**: 桌面端 + 移动端优化
- ✅ **丰富的案例库**: 71KB 真实案例研究
- ✅ **应急响应系统**: 完整的并发症处理流程

## Project Structure

```
lips-aesthetics-book/
├── .gitignore                          # Git 忽略配置
├── .git/                               # Git 版本控制
├── README.md                           # 项目说明文档
├── CLAUDE.md                           # 开发指南（本文件）
│
├── 📚 核心章节内容 (Markdown)
│   ├── 00_preface.md                   # 序言：医者心语
│   ├── 01_cultural_aesthetics.md      # 文化美学（26KB，已合并增强版）
│   ├── 02_scientific_principles.md    # 科学原理（53KB）
│   ├── 03_case_studies.md             # 案例研究（71KB，最大章节）
│   ├── 04_technical_mastery.md        # 技术掌握（50KB）
│   ├── 04_technical_mastery_international.md  # 国际技术（82KB）
│   ├── 05_comprehensive_strategy.md   # 综合策略（42KB）
│   ├── 06_functional_reconstruction.md # 功能重建（30KB）
│   ├── 07_doctor_selection.md         # 医生选择
│   ├── 08_cosmetics_tattoo.md         # 纹绣美容（41KB）
│   ├── 09_aftercare.md                # 术后护理
│   ├── 10_risk_aesthetics.md          # 风险管理（37KB）
│   └── 11_appendix.md                 # 附录资源（9.2KB，已合并增强版）
│
├── 📖 阅读器系统 (HTML)
│   ├── index.html                      # 主阅读器（桌面端优化，30KB）
│   └── reader.html                     # 移动端阅读器（27KB）
│
├── 🛠️ 交互式评估工具 (HTML)
│   ├── lip-assessment-test.html        # 唇部美学评估（33KB）
│   ├── doctor-skill-assessment.html    # 医生技能测试（51KB，最大工具）
│   ├── preoperative-risk-assessment.html  # 术前风险评估（35KB）
│   ├── emergency-response-simulation.html # 应急响应训练（50KB）
│   └── patient-satisfaction-survey.html   # 患者满意度调查（47KB）
│
├── 🖨️ 打印版本 (HTML, 5个)
│   ├── lip-assessment-scale-print.html
│   ├── doctor-skill-assessment-print.html
│   ├── preoperative-risk-assessment-print.html
│   ├── patient-satisfaction-survey-print.html
│   └── emergency-response-checklist-print.html
│
├── 📊 报告和文档 (HTML/Markdown)
│   ├── removal-report.html             # 专题移除报告
│   ├── topic-check.html                # 专题内容检查
│   ├── SYSTEM_OVERVIEW.md              # 系统架构概览（11KB）
│   ├── MOBILE_OPTIMIZATION_REPORT.md   # 移动端优化报告（9.2KB）
│   ├── PROJECT_STATISTICS.md           # 项目统计
│   ├── API.md                          # 技术接口文档（9.6KB）
│   └── 其他报告文档...
│
├── 📄 扩展专题 (Markdown, 3个保留)
│   ├── ai_assessment_system.md         # AI 评估系统（24KB）
│   ├── visual_design_guide.md          # 视觉设计指南（31KB）
│   ├── digital_ecosystem.md            # 数字生态系统（21KB）
│   └── 其他扩展内容...
│
└── 📝 日志和配置
    └── book_server.log                 # 服务器日志（已添加到 .gitignore）
```

## Development Commands

### 本地服务器启动

**启动 HTTP 服务器** (推荐端口: 28100):
```bash
# 前台运行
python3 -m http.server 28100

# 后台运行（不受终端退出影响）
nohup python3 -m http.server 28100 > book_server.log 2>&1 &

# 查看进程
ps aux | grep "http.server 28100"
lsof -i :28100

# 停止服务
kill <PID>
```

### 访问地址

- **主阅读器**: http://localhost:28100/index.html
- **移动端阅读器**: http://localhost:28100/reader.html
- **唇部评估**: http://localhost:28100/lip-assessment-test.html
- **医生技能测试**: http://localhost:28100/doctor-skill-assessment.html
- **风险评估**: http://localhost:28100/preoperative-risk-assessment.html
- **应急响应训练**: http://localhost:28100/emergency-response-simulation.html
- **满意度调查**: http://localhost:28100/patient-satisfaction-survey.html

### Git 工作流

```bash
# 查看状态
git status

# 添加修改
git add .

# 提交（注意：仅在用户明确要求时提交）
git commit -m "描述修改内容

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# 推送到远程
git push origin master
```

## Architecture

### 技术栈

- **前端**: 纯静态 HTML5 + CSS3 + JavaScript
- **内容格式**: Markdown (章节内容)
- **服务器**: Python SimpleHTTPServer (开发环境)
- **版本控制**: Git + GitHub

### 设计模式

#### 1. 双阅读器架构
- **index.html**: 桌面端优化，宽屏布局
- **reader.html**: 移动端优化，响应式设计

#### 2. 模块化评估工具
每个评估工具都是独立的 HTML 文件，包含：
- 完整的 HTML 结构
- 内联 CSS 样式
- 内联 JavaScript 逻辑
- 无外部依赖

#### 3. 打印友好设计
每个交互工具都有对应的打印版本：
- A4 标准排版
- 移除交互元素
- 优化打印样式

### 数据流

```
用户请求 → Python HTTP Server → 静态文件 → 浏览器渲染
                                   ↓
                            Markdown 内容
                            HTML 交互工具
                            CSS 样式
                            JavaScript 逻辑
```

## File Descriptions

### 核心章节文件 (12个 Markdown)

| 文件名 | 大小 | 内容主题 | 关键字 |
|--------|------|----------|--------|
| `00_preface.md` | 3.6KB | 序言 | 医者心语、美学初心 |
| `01_cultural_aesthetics.md` | 26KB | 文化美学 | 东方美学、诗词、网红文化 |
| `02_scientific_principles.md` | 53KB | 科学原理 | 解剖学、美学原理 |
| `03_case_studies.md` | 71KB | 案例研究 | 真实案例、经验总结 |
| `04_technical_mastery.md` | 50KB | 技术掌握 | 注射技术、操作指南 |
| `05_comprehensive_strategy.md` | 42KB | 综合策略 | 整体美学规划 |
| `06_functional_reconstruction.md` | 30KB | 功能重建 | 功能性修复 |
| `07_doctor_selection.md` | 5.3KB | 医生选择 | 选择标准 |
| `08_cosmetics_tattoo.md` | 41KB | 纹绣美容 | 纹绣技术 |
| `09_aftercare.md` | 5.4KB | 术后护理 | 护理指南 |
| `10_risk_aesthetics.md` | 37KB | 风险管理 | 风险识别与控制 |
| `11_appendix.md` | 9.2KB | 附录 | 资源、联系方式 |

### 交互式工具 (5个主工具 + 5个打印版)

| 工具名称 | 文件大小 | 功能说明 |
|----------|----------|----------|
| 唇部美学评估 | 33KB | 基于黄金比例的专业评估 |
| 医生技能测试 | 51KB | 11维度综合能力测试（最大工具）|
| 术前风险评估 | 35KB | 医疗和心理风险筛查 |
| 应急响应训练 | 50KB | 4种应急场景模拟 |
| 患者满意度调查 | 47KB | 标准化满意度评估 |

## Development Guidelines

### 内容编辑规范

1. **Markdown 格式**:
   - 标题层级清晰 (H1-H5)
   - 避免使用裸露的 # 符号
   - 使用标准的 Markdown 语法

2. **中文内容**:
   - 保持专业医学术语准确性
   - 使用简体中文
   - 避免错别字

3. **图片引用**:
   - 优先使用 `https://docs.bccsw.cn/` 托管的图片
   - 本地图片存放在 `/images` 目录（待创建）

### HTML 工具开发规范

1. **自包含原则**:
   - 所有 CSS 样式内联
   - 所有 JavaScript 逻辑内联
   - 避免外部依赖

2. **响应式设计**:
   - 移动优先
   - 使用 media queries
   - 支持触摸操作

3. **打印优化**:
   - 为每个工具提供打印版本
   - A4 纸张标准
   - 简化交互元素

### 性能优化建议

1. **文件压缩**:
   - 大型 HTML 文件 (50KB+) 需要压缩
   - 移除注释和空白

2. **图片优化**:
   - 使用 WebP 格式
   - 懒加载技术

3. **代码分离**:
   - 考虑将公共 CSS/JS 提取到独立文件

## Common Tasks

### 添加新章节

1. 创建新的 Markdown 文件: `XX_chapter_name.md`
2. 按照现有章节格式编写内容
3. 在 `index.html` 和 `reader.html` 中添加章节引用
4. 更新 `README.md` 中的章节列表

### 添加新评估工具

1. 创建 HTML 文件: `tool-name.html`
2. 参考现有工具的结构
3. 创建对应的打印版本: `tool-name-print.html`
4. 在 `11_appendix.md` 中添加链接
5. 在主页面添加入口

### 更新图片资源

1. 将图片上传到 CDN: `https://docs.bccsw.cn/`
2. 在 Markdown 中使用完整 URL 引用
3. 或创建本地 `/images` 目录并更新 .gitignore

## Troubleshooting

### 常见问题

**Q1: 服务器启动后无法访问**
```bash
# 检查端口占用
lsof -i :28100
# 检查防火墙
sudo ufw status
```

**Q2: 中文乱码**
- 确保所有文件使用 UTF-8 编码
- 检查 HTML 文件的 `<meta charset="UTF-8">` 标签

**Q3: Markdown 渲染异常**
- 检查标题层级是否正确
- 确保没有裸露的 # 符号
- 使用 `topic-check.html` 进行排版检查

**Q4: Git 提交时出现日志文件**
- 已添加 `.gitignore` 文件
- 日志文件 `book_server.log` 会被自动忽略

## Contributing

### 贡献流程

1. 在本地进行修改
2. 测试所有变更
3. 确保符合编码规范
4. 提交清晰的 commit message
5. 创建 Pull Request（如需）

### 代码审查要点

- ✅ 内容准确性
- ✅ 中文语法
- ✅ 响应式设计
- ✅ 打印友好性
- ✅ 无障碍支持

## Contact Information

**重庆联合丽格科技有限公司**
- 📍 地址: 重庆市渝中区临江支路28号
- 🌐 网站: https://www.bccsw.cn
- 📞 电话: 023-68726872
- 📧 邮箱: bccsw@cqlhlg.work
- 📄 ICP备案: 渝ICP备2024023473号

## License

版权所有 © 2024 重庆联合丽格科技有限公司

---

**最后更新**: 2025-10-12
**文档版本**: v1.1
**维护者**: 技术团队
