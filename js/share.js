/**
 * 微信分享系统 WeChat Share
 *
 * 行为：
 *  - 微信内浏览器：调用 WeixinJSBridge.invoke 分享给朋友/朋友圈
 *    （若未配置 JSSDK，回退到引导用户点右上角）
 *  - 微信外浏览器：展示二维码（扫码后在微信内打开）+ 复制链接
 *
 * 用法：
 *  - 任何元素加 [data-share-trigger] 属性即自动绑定点击打开面板
 *  - window.BookShare.open() 手动打开
 */
(function() {
    'use strict';

    /** 判断是否在微信内 */
    function isInWeChat() {
        return /MicroMessenger/i.test(navigator.userAgent);
    }

    /** 获取分享信息 */
    function getShareData() {
        return {
            url: location.href.split('#')[0],   // 去掉 hash
            title: document.title || '绛唇解语花 — 美容医生的唇部美学笔记',
            desc: document.querySelector('meta[name="description"]')?.content || '专业的唇部美学医学专著',
            img: 'https://docs.bccsw.cn/logo.png'
        };
    }

    /* ============================================================
       二维码生成（纯 JS，无依赖）
       基于 QR Code Model 2，支持字节模式
       ============================================================ */
    // ---- QR 码核心（精简实现，MIT 改编自 qrcode-generator 思路）----
    // 为控制体积，这里用一个紧凑但完整的 QR 生成实现
    const QR = (function() {
        // Galois Field
        const EXP = new Array(512), LOG = new Array(256);
        (function() {
            let x = 1;
            for (let i = 0; i < 255; i++) {
                EXP[i] = x; LOG[x] = i;
                x <<= 1;
                if (x & 0x100) x ^= 0x11d;
            }
            for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
        })();
        function gmul(a, b) { return a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]]; }

        // 版本容量（字节模式，纠错级 M）—— 只列常用版本 1-10
        const CAP = [-1, 14, 26, 42, 62, 84, 106, 122, 152, 180, 213];
        // 数据码字数（版本1-10，纠错M）
        const DATA_CW = [-1, 16, 28, 44, 64, 86, 108, 124, 154, 182, 216];
        // 纠错码字数（版本1-10，纠错M，单块）
        const EC_CW = [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26];
        // 对齐图案位置（版本2+ 需要）
        const ALIGN = [-1, [], [6,18], [6,22], [6,26], [6,30], [6,34], [6,22,38], [6,24,42], [6,26,46], [6,28,50]];

        function chooseVersion(text) {
            const bytes = utf8Bytes(text);
            for (let v = 1; v <= 10; v++) {
                if (bytes.length <= CAP[v]) return { version: v, bytes };
            }
            // 超过版本10容量，截断（URL 一般不会超）
            return { version: 10, bytes: bytes.slice(0, CAP[10]) };
        }

        function utf8Bytes(str) {
            const out = [];
            for (let i = 0; i < str.length; i++) {
                let c = str.charCodeAt(i);
                if (c < 0x80) out.push(c);
                else if (c < 0x800) { out.push(0xC0 | (c >> 6), 0x80 | (c & 0x3F)); }
                else { out.push(0xE0 | (c >> 12), 0x80 | ((c >> 6) & 0x3F), 0x80 | (c & 0x3F)); }
            }
            return out;
        }

        // 生成矩阵 —— 为控制代码量，使用查表方式构建
        function buildMatrix(version, bytes) {
            const size = 17 + version * 4;
            const totalDataCw = DATA_CW[version];
            const ecCw = EC_CW[version];

            // 编码数据位流
            let bits = [];
            // 模式指示符（字节模式 = 0100）
            bits.push(0, 1, 0, 0);
            // 字符数指示符（版本1-9 用 8 位，版本10 用 16 位）
            const lenBits = version < 10 ? 8 : 16;
            const len = bytes.length;
            for (let i = lenBits - 1; i >= 0; i--) bits.push((len >> i) & 1);
            // 数据
            for (const b of bytes) {
                for (let i = 7; i >= 0; i--) bits.push((b >> i) & 1);
            }
            // 结束符
            for (let i = 0; i < 4 && bits.length < totalDataCw * 8; i++) bits.push(0);
            // 补齐到字节
            while (bits.length % 8) bits.push(0);
            // 转码字
            let cws = [];
            for (let i = 0; i < bits.length; i += 8) {
                let v = 0;
                for (let j = 0; j < 8; j++) v = (v << 1) | bits[i + j];
                cws.push(v);
            }
            // 填充
            const pad = [0xEC, 0x11];
            let pi = 0;
            while (cws.length < totalDataCw) cws.push(pad[pi++ % 2]);

            // 纠错码字（Reed-Solomon）
            const ecWords = rsEncode(cws, ecCw);
            const allCw = cws.concat(ecWords);

            // 转位流
            let bitStr = allCw.map(b => b.toString(2).padStart(8, '0')).join('');
            // 补0和补1
            const totalBits = size * size;
            bitStr += '0000000000000000000000';

            // 构建模块矩阵
            const mx = [];
            for (let i = 0; i < size; i++) mx.push(new Array(size).fill(null));

            // 定位图案
            function placeFinder(r, c) {
                for (let dr = -1; dr <= 7; dr++) {
                    for (let dc = -1; dc <= 7; dc++) {
                        const rr = r + dr, cc = c + dc;
                        if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
                        const border = (dr === 0 || dr === 6) && dc >= 0 && dc <= 6;
                        const borderV = (dc === 0 || dc === 6) && dr >= 0 && dr <= 6;
                        const center = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
                        mx[rr][cc] = (border || borderV || center) ? 1 : 0;
                    }
                }
            }
            placeFinder(0, 0);
            placeFinder(0, size - 7);
            placeFinder(size - 7, 0);

            // 时序图案
            for (let i = 8; i < size - 8; i++) {
                if (mx[6][i] === null) mx[6][i] = (i % 2 === 0) ? 1 : 0;
                if (mx[i][6] === null) mx[i][6] = (i % 2 === 0) ? 1 : 0;
            }

            // 对齐图案
            const ap = ALIGN[version] || [];
            for (const r of ap) {
                for (const c of ap) {
                    if (mx[r][c] !== null) continue;
                    for (let dr = -2; dr <= 2; dr++) {
                        for (let dc = -2; dc <= 2; dc++) {
                            const ring = Math.abs(dr) === 2 || Math.abs(dc) === 2;
                            const center = dr === 0 && dc === 0;
                            mx[r + dr][c + dc] = (ring || center) ? 1 : 0;
                        }
                    }
                }
            }

            // 格式信息（纠错级 M = 00，掩码 0 = 000）→ 固定使用一个值
            // 简化：使用 纠错M + 掩码0 的格式串
            const formatBits = 0x5412; // 预计算的 BCH(00,000)
            for (let i = 0; i < 15; i++) {
                const bit = (formatBits >> i) & 1;
                // 左上角
                if (i < 6) mx[8][i] = bit;
                else if (i < 8) mx[8][i + 1] = bit;
                else if (i < 9) mx[7][8] = bit;
                else mx[14 - i][8] = bit;
                // 右上 + 左下
                if (i < 8) mx[size - 1 - i][8] = bit;
                else mx[8][size - 15 + i] = bit;
            }
            mx[size - 8][8] = 1; // 黑模块

            // 数据填充（Z 字形）
            let bitIdx = 0;
            let upward = true;
            for (let col = size - 1; col > 0; col -= 2) {
                if (col === 6) col--; // 跳过时序列
                for (let i = 0; i < size; i++) {
                    const r = upward ? size - 1 - i : i;
                    for (let c = 0; c < 2; c++) {
                        const cc = col - c;
                        if (mx[r][cc] !== null) continue;
                        const mask = ((r + cc) % 2) === 0; // 掩码 0
                        let bit = parseInt(bitStr[bitIdx++]) || 0;
                        if (mask) bit = bit ^ 1;
                        mx[r][cc] = bit;
                    }
                }
                upward = !upward;
            }

            return mx;
        }

        function rsEncode(data, ecLen) {
            // 生成多项式
            const gen = [1];
            for (let i = 0; i < ecLen; i++) {
                const ng = new Array(gen.length + 1).fill(0);
                for (let j = 0; j < gen.length; j++) {
                    ng[j] ^= gen[j];
                    ng[j + 1] ^= gmul(gen[j], EXP[i]);
                }
                gen.length = 0;
                for (const x of ng) gen.push(x);
            }
            // 多项式除法
            const res = data.concat(new Array(ecLen).fill(0));
            for (let i = 0; i < data.length; i++) {
                const coef = res[i];
                if (coef === 0) continue;
                for (let j = 0; j < gen.length; j++) {
                    res[i + j] ^= gmul(gen[j], coef);
                }
            }
            return res.slice(data.length);
        }

        /** 生成 QR 矩阵 */
        function generate(text) {
            const { version, bytes } = chooseVersion(text);
            return buildMatrix(version, bytes);
        }

        /** 渲染为 SVG 字符串 */
        function toSVG(matrix, scale = 6, color = '#1D1D1F') {
            const size = matrix.length;
            const px = scale;
            const total = size * px;
            let rects = '';
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    if (matrix[r][c] === 1) {
                        rects += `<rect x="${c * px}" y="${r * px}" width="${px}" height="${px}" fill="${color}"/>`;
                    }
                }
            }
            return `<svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="${total}" viewBox="0 0 ${total} ${total}" shape-rendering="crispEdges"><rect width="${total}" height="${total}" fill="white"/>${rects}</svg>`;
        }

        return { generate, toSVG };
    })();

    /* ============================================================
       分享面板 UI
       ============================================================ */
    let sheetEl = null;

    function buildSheet() {
        const sheet = document.createElement('div');
        sheet.className = 'share-sheet';
        sheet.setAttribute('hidden', '');
        sheet.innerHTML = `
            <div class="share-overlay" data-share-close></div>
            <div class="share-panel">
                <div class="share-handle"></div>
                <div class="share-title">分享</div>
                <div class="share-options">
                    <button class="share-opt" data-share="wechat">
                        <span class="share-opt-icon share-opt-wechat"><i class="icon" data-icon="wechat"></i></span>
                        <span class="share-opt-label">微信好友</span>
                    </button>
                    <button class="share-opt" data-share="moments">
                        <span class="share-opt-icon share-opt-moments"><i class="icon" data-icon="moments"></i></span>
                        <span class="share-opt-label">朋友圈</span>
                    </button>
                    <button class="share-opt" data-share="copy">
                        <span class="share-opt-icon share-opt-copy"><i class="icon" data-icon="link"></i></span>
                        <span class="share-opt-label">复制链接</span>
                    </button>
                    <button class="share-opt" data-share="qr">
                        <span class="share-opt-icon share-opt-qr"><i class="icon" data-icon="qrCode"></i></span>
                        <span class="share-opt-label">二维码</span>
                    </button>
                </div>
                <div class="share-qr-area" id="share-qr-area" hidden>
                    <div id="share-qr-img"></div>
                    <p class="share-qr-tip">用微信扫一扫，在微信内打开</p>
                </div>
                <div class="share-wechat-tip" id="share-wechat-tip" hidden>
                    <p>点击右上角 <strong>···</strong> 按钮</p>
                    <p>选择「发送给朋友」或「分享到朋友圈」</p>
                </div>
                <button class="share-cancel" data-share-close>取消</button>
            </div>
        `;
        document.body.appendChild(sheet);

        // 事件
        sheet.querySelectorAll('[data-share-close]').forEach(el => el.addEventListener('click', close));
        sheet.querySelector('[data-share="wechat"]').addEventListener('click', () => shareToWeChat('friend'));
        sheet.querySelector('[data-share="moments"]').addEventListener('click', () => shareToWeChat('timeline'));
        sheet.querySelector('[data-share="copy"]').addEventListener('click', copyLink);
        sheet.querySelector('[data-share="qr"]').addEventListener('click', showQR);

        if (window.Icons) Icons.renderAll(sheet);
        return sheet;
    }

    function open() {
        if (!sheetEl) sheetEl = buildSheet();
        sheetEl.removeAttribute('hidden');
        requestAnimationFrame(() => sheetEl.classList.add('active'));
        document.body.style.overflow = 'hidden';
    }

    function close() {
        if (!sheetEl) return;
        sheetEl.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => sheetEl.setAttribute('hidden', ''), 300);
        // 重置子区域
        const qr = document.getElementById('share-qr-area');
        const tip = document.getElementById('share-wechat-tip');
        if (qr) qr.hidden = true;
        if (tip) tip.hidden = true;
    }

    function shareToWeChat(scene) {
        const data = getShareData();
        if (isInWeChat() && typeof WeixinJSBridge !== 'undefined') {
            // 微信内：尝试调用 bridge（部分版本可用）
            try {
                const api = scene === 'timeline' ? 'shareTimeline' : 'sendAppMessage';
                const params = scene === 'timeline'
                    ? { img_url: data.img, link: data.url, title: data.title }
                    : { app_id: '', img_url: data.img, link: data.url, title: data.title, desc: data.desc };
                WeixinJSBridge.invoke(api, params, () => close());
                return;
            } catch (e) { /* 回退到引导 */ }
        }
        // 微信外或 bridge 不可用：显示引导
        const tip = document.getElementById('share-wechat-tip');
        const qr = document.getElementById('share-qr-area');
        if (qr) qr.hidden = true;
        if (tip) {
            tip.hidden = false;
            const isIn = isInWeChat();
            tip.innerHTML = isIn
                ? '<p>点击右上角 <strong>···</strong> 按钮</p><p>选择「发送给朋友」或「分享到朋友圈」</p>'
                : '<p>长按页面或扫码后在微信内打开</p><p>再点击右上角 <strong>···</strong> 分享</p>';
        }
    }

    function copyLink() {
        const url = location.href;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(showCopied).catch(fallbackCopy);
        } else {
            fallbackCopy();
        }
        function fallbackCopy() {
            const ta = document.createElement('textarea');
            ta.value = url;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try { document.execCommand('copy'); showCopied(); } catch (e) {}
            document.body.removeChild(ta);
        }
    }

    function showCopied() {
        const btn = sheetEl?.querySelector('[data-share="copy"] .share-opt-label');
        if (!btn) return;
        const orig = btn.textContent;
        btn.textContent = '已复制';
        setTimeout(() => btn.textContent = orig, 1500);
    }

    function showQR() {
        const area = document.getElementById('share-qr-area');
        const img = document.getElementById('share-qr-img');
        const tip = document.getElementById('share-wechat-tip');
        if (tip) tip.hidden = true;
        if (!area || !img) return;
        try {
            const matrix = QR.generate(location.href);
            img.innerHTML = QR.toSVG(matrix, 6);
            area.hidden = false;
        } catch (e) {
            img.innerHTML = '<p style="color:var(--ink-muted);font-size:13px">二维码生成失败，请使用复制链接</p>';
            area.hidden = false;
        }
    }

    // 绑定所有 [data-share-trigger]
    function bindTriggers() {
        document.querySelectorAll('[data-share-trigger]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                open();
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindTriggers);
    } else {
        bindTriggers();
    }

    window.BookShare = { open, close };
})();
