/**
 * 全局导航系统 Global Navigation
 * 《绛唇解语花》—— 抽屉式目录、搜索、快捷键、面包屑
 *
 * 图标改用 js/icons.js 的 SVG（icon 字段为图标名）
 */

(function() {
    'use strict';

    const CHAPTERS = [
        { id: '00', file: '00_preface.md', title: '前言', number: '序言', category: 'core', icon: 'book' },
        { id: '01', file: '01_cultural_aesthetics.md', title: '文化美学', number: '第一章', category: 'core', icon: 'globe' },
        { id: '02', file: '02_scientific_principles.md', title: '科学原理', number: '第二章', category: 'core', icon: 'flask' },
        { id: '03', file: '03_case_studies.md', title: '案例研究', number: '第三章', category: 'core', icon: 'clipboard' },
        { id: '04', file: '04_technical_mastery_international.md', title: '技术精进', number: '第四章', category: 'core', icon: 'zap' },
        { id: '05', file: '05_comprehensive_strategy.md', title: '综合策略', number: '第五章', category: 'core', icon: 'target' },
        { id: '06', file: '06_functional_reconstruction.md', title: '功能重建', number: '第六章', category: 'core', icon: 'wrench' },
        { id: '07', file: '07_doctor_selection.md', title: '医生选择', number: '第七章', category: 'core', icon: 'stethoscope' },
        { id: '08', file: '08_cosmetics_tattoo.md', title: '唇部纹绣', number: '第八章', category: 'core', icon: 'palette' },
        { id: '09', file: '09_aftercare.md', title: '术后护理', number: '第九章', category: 'core', icon: 'pill' },
        { id: '10', file: '10_risk_aesthetics.md', title: '风险美学', number: '第十章', category: 'core', icon: 'shield' },
        { id: '11', file: '11_appendix.md', title: '参考资料', number: '附录', category: 'core', icon: 'fileText' },
        { id: 'ai', file: 'ai_assessment_system.md', title: 'AI评估系统', number: '专题一', category: 'extended', icon: 'robot' },
        { id: 'visual', file: 'visual_design_guide.md', title: '视觉设计指南', number: '专题二', category: 'extended', icon: 'palette' },
        { id: 'digital', file: 'digital_ecosystem.md', title: '数字生态系统', number: '专题三', category: 'extended', icon: 'layers' }
    ];

    const TOOLS = [
        { id: 'lip-assessment', file: 'lip-assessment-test.html', title: '唇部美学评估', icon: 'lipAssess' },
        { id: 'doctor-skill', file: 'doctor-skill-assessment.html', title: '医生技能测试', icon: 'stethoscope' },
        { id: 'risk-assessment', file: 'preoperative-risk-assessment.html', title: '术前风险评估', icon: 'alertMedical' },
        { id: 'emergency', file: 'emergency-response-simulation.html', title: '应急响应模拟', icon: 'siren' },
        { id: 'survey', file: 'patient-satisfaction-survey.html', title: '满意度调查', icon: 'smile' }
    ];

    let navState = { isMenuOpen: false, isShortcutsOpen: false };

    /** 图标 helper */
    function icon(name) {
        return window.Icons ? Icons.get(name) : '';
    }

    function iconI(name) {
        return `<i class="icon" data-icon="${name}"></i>`;
    }

    // ---- 浮动按钮（移动端兜底，桌面端可用 header 内的触发器） ----
    function createFloatingButton() {
        const btn = document.createElement('button');
        btn.id = 'floating-nav-button';
        btn.className = 'floating-nav-button';
        btn.setAttribute('aria-label', '打开目录');
        btn.innerHTML = icon('menu');
        btn.addEventListener('click', toggleMenu);
        return btn;
    }

    function createMenu() {
        const menu = document.createElement('div');
        menu.id = 'navigation-menu';
        menu.className = 'navigation-menu';
        menu.setAttribute('hidden', '');

        menu.innerHTML = `
            <div class="nav-menu-header">
                <div class="nav-menu-brand">
                    <span class="site-brand-mark">绛</span>
                    <span>目录</span>
                </div>
                <button class="nav-close" data-nav-close aria-label="关闭">${icon('close')}</button>
            </div>

            <div class="nav-menu-search">
                <span class="nav-search-icon">${icon('search')}</span>
                <input type="text" id="nav-search" placeholder="搜索章节…" aria-label="搜索章节">
            </div>

            <div class="nav-menu-body">
                <div class="nav-section">
                    <h4 class="nav-section-title">核心章节</h4>
                    <ul class="nav-list">${chapterList('core')}</ul>
                </div>
                <div class="nav-section">
                    <h4 class="nav-section-title">扩展专题</h4>
                    <ul class="nav-list">${chapterList('extended')}</ul>
                </div>
                <div class="nav-section">
                    <h4 class="nav-section-title">交互式工具</h4>
                    <ul class="nav-list">${toolList()}</ul>
                </div>
                <div class="nav-section">
                    <h4 class="nav-section-title">快捷操作</h4>
                    <div class="nav-actions">
                        <button class="nav-action" data-nav-home>${icon('home')}<span>返回首页</span></button>
                        <button class="nav-action" data-nav-print>${icon('print')}<span>打印当前页</span></button>
                        <button class="nav-action" data-nav-share>${icon('share')}<span>分享本页</span></button>
                        <button class="nav-action" data-nav-help>${icon('keyboard')}<span>快捷键帮助</span></button>
                    </div>
                </div>
            </div>

            <div class="nav-menu-footer">
                <small>按 Esc 关闭 · 按 N 打开 · 按 S 搜索</small>
            </div>
        `;

        // 事件绑定
        menu.querySelector('[data-nav-close]').addEventListener('click', closeMenu);
        menu.querySelector('[data-nav-home]').addEventListener('click', () => { location.href = 'index.html'; });
        menu.querySelector('[data-nav-print]').addEventListener('click', () => { closeMenu(); window.print(); });
        menu.querySelector('[data-nav-share]').addEventListener('click', () => {
            closeMenu();
            const t = document.querySelector('[data-share-trigger]');
            if (t) t.click();
            else if (window.BookShare) window.BookShare.open();
        });
        menu.querySelector('[data-nav-help]').addEventListener('click', showShortcuts);
        menu.querySelector('#nav-search').addEventListener('input', handleSearch);

        return menu;
    }

    function chapterList(cat) {
        return CHAPTERS.filter(c => c.category === cat).map(c => `
            <li class="nav-item" data-search="${(c.title + c.number).toLowerCase()}">
                <a href="reader.html?chapter=${c.file}" class="nav-link">
                    <span class="nav-link-icon">${icon(c.icon)}</span>
                    <span class="nav-link-seal">${c.number}</span>
                    <span class="nav-link-title">${c.title}</span>
                </a>
            </li>`).join('');
    }

    function toolList() {
        return TOOLS.map(t => `
            <li class="nav-item" data-search="${t.title.toLowerCase()}">
                <a href="${t.file}" class="nav-link" target="_blank" rel="noopener">
                    <span class="nav-link-icon">${icon(t.icon)}</span>
                    <span class="nav-link-title">${t.title}</span>
                </a>
            </li>`).join('');
    }

    function createShortcuts() {
        const panel = document.createElement('div');
        panel.id = 'shortcuts-panel';
        panel.className = 'shortcuts-panel';
        panel.setAttribute('hidden', '');
        panel.innerHTML = `
            <div class="shortcuts-card">
                <div class="shortcuts-head">
                    <h3>键盘快捷键</h3>
                    <button class="nav-close" data-sc-close aria-label="关闭">${icon('close')}</button>
                </div>
                <div class="shortcuts-grid">
                    <div class="sc-group">
                        <h4>阅读导航</h4>
                        <div class="sc-item"><kbd>←</kbd><span>上一章</span></div>
                        <div class="sc-item"><kbd>→</kbd><span>下一章</span></div>
                        <div class="sc-item"><kbd>Home</kbd><span>回到顶部</span></div>
                        <div class="sc-item"><kbd>End</kbd><span>跳到底部</span></div>
                    </div>
                    <div class="sc-group">
                        <h4>菜单操作</h4>
                        <div class="sc-item"><kbd>N</kbd><span>打开/关闭目录</span></div>
                        <div class="sc-item"><kbd>S</kbd><span>聚焦搜索框</span></div>
                        <div class="sc-item"><kbd>Esc</kbd><span>关闭面板</span></div>
                    </div>
                    <div class="sc-group">
                        <h4>快捷功能</h4>
                        <div class="sc-item"><kbd>P</kbd><span>打印当前页</span></div>
                        <div class="sc-item"><kbd>H</kbd><span>返回首页</span></div>
                        <div class="sc-item"><kbd>?</kbd><span>显示此帮助</span></div>
                    </div>
                </div>
            </div>`;
        panel.addEventListener('click', e => {
            if (e.target === panel || e.target.closest('[data-sc-close]')) closeShortcuts();
        });
        return panel;
    }

    function handleSearch(e) {
        const term = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.nav-item').forEach(item => {
            const text = item.dataset.search || item.textContent.toLowerCase();
            item.style.display = !term || text.includes(term) ? '' : 'none';
        });
    }

    function toggleMenu() {
        navState.isMenuOpen ? closeMenu() : openMenu();
    }
    function openMenu() {
        const m = document.getElementById('navigation-menu');
        if (!m) return;
        m.removeAttribute('hidden');
        requestAnimationFrame(() => m.classList.add('active'));
        navState.isMenuOpen = true;
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            const s = document.getElementById('nav-search');
            if (s) s.focus();
        }, 200);
    }
    function closeMenu() {
        const m = document.getElementById('navigation-menu');
        if (!m) return;
        m.classList.remove('active');
        navState.isMenuOpen = false;
        document.body.style.overflow = '';
        setTimeout(() => m.setAttribute('hidden', ''), 300);
    }
    function showShortcuts() {
        const p = document.getElementById('shortcuts-panel');
        if (!p) return;
        p.removeAttribute('hidden');
        requestAnimationFrame(() => p.classList.add('active'));
        navState.isShortcutsOpen = true;
    }
    function closeShortcuts() {
        const p = document.getElementById('shortcuts-panel');
        if (!p) return;
        p.classList.remove('active');
        navState.isShortcutsOpen = false;
        setTimeout(() => p.setAttribute('hidden', ''), 300);
    }

    function onKey(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            if (e.key === 'Escape') e.target.blur();
            return;
        }
        switch (e.key.toLowerCase()) {
            case 'n': e.preventDefault(); toggleMenu(); break;
            case 's': e.preventDefault(); openMenu(); setTimeout(() => document.getElementById('nav-search')?.focus(), 200); break;
            case 'escape': closeMenu(); closeShortcuts(); break;
            case 'p': if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); window.print(); } break;
            case 'h': if (!e.ctrlKey && !e.metaKey) { e.preventDefault(); location.href = 'index.html'; } break;
            case '?': e.preventDefault(); showShortcuts(); break;
            case 'home': e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); break;
            case 'end': e.preventDefault(); window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }); break;
        }
    }

    function init() {
        document.body.appendChild(createFloatingButton());
        document.body.appendChild(createMenu());
        document.body.appendChild(createShortcuts());
        document.addEventListener('keydown', onKey);
        document.addEventListener('click', e => {
            if (navState.isMenuOpen) {
                const menu = document.getElementById('navigation-menu');
                const fab = document.getElementById('floating-nav-button');
                if (!menu.contains(e.target) && !fab.contains(e.target)) closeMenu();
            }
        });
        // 渲染注入的图标
        if (window.Icons) Icons.renderAll();
    }

    window.BookNavigation = {
        init, toggleMenu, openMenu, closeMenu,
        showShortcuts, closeShortcuts,
        chapters: CHAPTERS, tools: TOOLS, state: navState
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
