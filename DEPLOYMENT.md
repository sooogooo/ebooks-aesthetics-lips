# 部署指南 | Deployment Guide

## GitHub Pages 自动部署

本项目已配置 GitHub Actions 自动部署到 GitHub Pages。

### 自动部署流程

1. **触发条件**：
   - 推送到 `master` 或 `main` 分支
   - 手动触发 (workflow_dispatch)

2. **部署步骤**：
   - 自动检出代码
   - 配置 GitHub Pages
   - 上传静态文件
   - 部署到 GitHub Pages

3. **访问地址**：
   - 部署后可通过以下地址访问：
   - `https://<username>.github.io/ebooks-aesthetics-lips/`
   - 或配置的自定义域名

### 首次启用 GitHub Pages

1. 进入 GitHub 仓库设置：`Settings` → `Pages`
2. 在 "Build and deployment" 部分：
   - Source: 选择 `GitHub Actions`
3. 保存设置
4. 推送代码到 master 分支，自动触发部署

### 查看部署状态

- 在 GitHub 仓库页面点击 `Actions` 标签
- 查看 "Deploy to GitHub Pages" 工作流程
- 绿色勾号表示部署成功

### 本地测试

在推送到 GitHub 之前，建议先本地测试：

```bash
# 启动本地服务器
npm run serve

# 或后台运行
npm run serve:bg

# 检查服务器状态
npm run status

# 停止服务器
npm run stop
```

访问 `http://localhost:28100` 测试网站功能。

## 其他部署选项

### Vercel 部署

1. 在 [Vercel](https://vercel.com) 创建账号
2. 导入 GitHub 仓库
3. Vercel 会自动检测静态网站并部署
4. 配置自定义域名（可选）

```bash
# 使用 Vercel CLI 部署
npm install -g vercel
vercel
```

### Netlify 部署

1. 在 [Netlify](https://www.netlify.com) 创建账号
2. 连接 GitHub 仓库
3. 配置构建设置：
   - Build command: `echo "No build required"`
   - Publish directory: `.`
4. 部署站点

### 自托管服务器

将项目文件上传到任何支持静态文件的 Web 服务器：

```bash
# Apache 配置示例
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/lips-aesthetics-book
    <Directory /var/www/lips-aesthetics-book>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

# Nginx 配置示例
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/lips-aesthetics-book;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

## 域名配置

### 添加自定义域名

1. 在 GitHub Pages 设置中添加自定义域名
2. 在域名 DNS 设置中添加 CNAME 记录：
   ```
   CNAME: www -> <username>.github.io
   ```
3. 或添加 A 记录指向 GitHub Pages IP：
   ```
   A: @ -> 185.199.108.153
   A: @ -> 185.199.109.153
   A: @ -> 185.199.110.153
   A: @ -> 185.199.111.153
   ```

### HTTPS 配置

GitHub Pages 自动为 github.io 域名提供 HTTPS。
自定义域名启用 HTTPS：
1. 在 GitHub Pages 设置中勾选 "Enforce HTTPS"
2. 等待 Let's Encrypt 证书自动签发（通常几分钟）

## 性能优化建议

### CDN 加速

考虑使用 CDN 服务加速全球访问：
- Cloudflare (免费计划可用)
- AWS CloudFront
- 阿里云 CDN
- 腾讯云 CDN

### 缓存策略

在服务器配置中设置适当的缓存头：

```nginx
# Nginx 示例
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

location ~* \.(html)$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

## 监控和分析

### 添加 Google Analytics

在 `index.html` 和 `reader.html` 中添加跟踪代码：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 错误监控

考虑添加错误监控服务：
- Sentry
- Rollbar
- Bugsnag

## 备份策略

1. **Git 版本控制**：代码已托管在 GitHub
2. **定期导出**：定期导出生产环境数据
3. **多地备份**：使用多个部署平台作为备份

## 常见问题

### Q: 部署后页面显示 404

- 检查 GitHub Pages 是否已启用
- 确认 `index.html` 文件在根目录
- 等待几分钟让 DNS 生效

### Q: 样式或脚本加载失败

- 检查资源路径是否使用相对路径
- 确认所有资源文件都已提交到仓库
- 检查浏览器控制台的错误信息

### Q: 如何回滚到之前的版本

```bash
# 查看历史提交
git log --oneline

# 回滚到指定提交
git revert <commit-hash>
git push origin master
```

## 技术支持

如有部署问题，请联系：
- Email: bccsw@cqlhlg.work
- GitHub Issues: https://github.com/sooogooo/ebooks-aesthetics-lips/issues

---

**最后更新**: 2025-10-12
