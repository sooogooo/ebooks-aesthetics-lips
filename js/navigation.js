/**
 * 全局导航系统
 * Global Navigation System for 《绛唇解语花》
 *
 * 功能特性 Features:
 * - 浮动导航菜单 Floating navigation menu
 * - 章节快速跳转 Chapter quick jump
 * - 键盘快捷键 Keyboard shortcuts
 * - 面包屑导航 Breadcrumb navigation
 * - 阅读进度追踪 Reading progress tracking
 * - 响应式设计 Responsive design
 */

(function() {
    'use strict';

    // ============================================
    // 章节配置 Chapter Configuration
    // ============================================
    const CHAPTERS = [
        { id: '00', file: '00_preface.md', title: '前言', number: '序言', category: 'core', icon: '📖' },
        { id: '01', file: '01_cultural_aesthetics.md', title: '文化美学', number: '第一章', category: 'core', icon: '🌍' },
        { id: '02', file: '02_scientific_principles.md', title: '科学原理', number: '第二章', category: 'core', icon: '🔬' },
        { id: '03', file: '03_case_studies.md', title: '案例研究', number: '第三章', category: 'core', icon: '📋' },
        { id: '04', file: '04_technical_mastery_international.md', title: '技术精进', number: '第四章', category: 'core', icon: '⚡' },
        { id: '05', file: '05_comprehensive_strategy.md', title: '综合策略', number: '第五章', category: 'core', icon: '🎯' },
        { id: '06', file: '06_functional_reconstruction.md', title: '功能重建', number: '第六章', category: 'core', icon: '🔧' },
        { id: '07', file: '07_doctor_selection.md', title: '医生选择', number: '第七章', category: 'core', icon: '👨‍⚕️' },
        { id: '08', file: '08_cosmetics_tattoo.md', title: '唇部纹绣', number: '第八章', category: 'core', icon: '🎨' },
        { id: '09', file: '09_aftercare.md', title: '术后护理', number: '第九章', category: 'core', icon: '💊' },
        { id: '10', file: '10_risk_aesthetics.md', title: '风险美学', number: '第十章', category: 'core', icon: '⚠️' },
        { id: '11', file: '11_appendix.md', title: '参考资料', number: '附录', category: 'core', icon: '📑' },
        { id: 'ai', file: 'ai_assessment_system.md', title: 'AI评估系统', number: '专题一', category: 'extended', icon: '🤖' },
        { id: 'visual', file: 'visual_design_guide.md', title: '视觉设计指南', number: '专题二', category: 'extended', icon: '🎭' },
        { id: 'digital', file: 'digital_ecosystem.md', title: '数字生态系统', number: '专题三', category: 'extended', icon: '🌐' }
    ];

    // 交互式工具配置
    const TOOLS = [
        { id: 'lip-assessment', file: 'lip-assessment-test.html', title: '唇部美学评估', icon: '💄' },
        { id: 'doctor-skill', file: 'doctor-skill-assessment.html', title: '医生技能测试', icon: '👨‍⚕️' },
        { id: 'risk-assessment', file: 'preoperative-risk-assessment.html', title: '风险评估', icon: '⚕️' },
        { id: 'emergency', file: 'emergency-response-simulation.html', title: '应急响应', icon: '🚨' },
        { id: 'survey', file: 'patient-satisfaction-survey.html', title: '满意度调查', icon: '📊' }
    ];

    // ============================================
    // 导航状态管理 Navigation State Management
    // ============================================
    let navState = {
        currentChapter: null,
        isMenuOpen: false,
        isSidebarOpen: false,
        readingProgress: 0,
        lastScrollPos: 0
    };

    // ============================================
    // 创建浮动导航按钮 Create Floating Nav Button
    // ============================================
    function createFloatingNavButton() {
        const button = document.createElement('button');
        button.id = 'floating-nav-button';
        button.className = 'floating-nav-button';
        button.innerHTML = '☰';
        button.setAttribute('aria-label', '打开导航菜单');
        button.setAttribute('title', '导航菜单 (快捷键: N)');

        button.addEventListener('click', toggleNavigationMenu);

        return button;
    }

    // ============================================
    // 创建导航菜单 Create Navigation Menu
    // ============================================
    function createNavigationMenu() {
        const menu = document.createElement('div');
        menu.id = 'navigation-menu';
        menu.className = 'navigation-menu';
        menu.style.display = 'none';

        menu.innerHTML = `
            <div class="nav-menu-header">
                <h3>📚 书籍导航</h3>
                <button class="nav-close-button" onclick="window.BookNavigation.closeMenu()" aria-label="关闭菜单">✕</button>
            </div>

            <div class="nav-menu-search">
                <input type="text" id="nav-search" placeholder="🔍 搜索章节..." aria-label="搜索章节">
            </div>

            <div class="nav-menu-content">
                <div class="nav-section">
                    <h4 class="nav-section-title">📖 核心章节</h4>
                    <ul class="nav-chapter-list" id="core-chapters-list">
                        ${generateChapterList('core')}
                    </ul>
                </div>

                <div class="nav-section">
                    <h4 class="nav-section-title">🔬 扩展专题</h4>
                    <ul class="nav-chapter-list" id="extended-chapters-list">
                        ${generateChapterList('extended')}
                    </ul>
                </div>

                <div class="nav-section">
                    <h4 class="nav-section-title">🛠️ 交互式工具</h4>
                    <ul class="nav-tool-list">
                        ${generateToolList()}
                    </ul>
                </div>

                <div class="nav-section">
                    <h4 class="nav-section-title">⚡ 快捷操作</h4>
                    <div class="nav-quick-actions">
                        <button onclick="window.location.href='index.html'" class="nav-action-btn">
                            🏠 返回首页
                        </button>
                        <button onclick="window.print()" class="nav-action-btn">
                            🖨️ 打印当前页
                        </button>
                        <button onclick="window.BookNavigation.showShortcuts()" class="nav-action-btn">
                            ⌨️ 快捷键
                        </button>
                    </div>
                </div>
            </div>

            <div class="nav-menu-footer">
                <small>提示: 按 ESC 关闭菜单 | 按 N 打开菜单</small>
            </div>
        `;

        // 添加搜索功能
        setTimeout(() => {
            const searchInput = document.getElementById('nav-search');
            if (searchInput) {
                searchInput.addEventListener('input', handleSearch);
            }
        }, 100);

        return menu;
    }

    // ============================================
    // 生成章节列表 Generate Chapter List
    // ============================================
    function generateChapterList(category) {
        return CHAPTERS
            .filter(ch => ch.category === category)
            .map(ch => `
                <li class="nav-chapter-item" data-chapter-id="${ch.id}">
                    <a href="reader.html?chapter=${ch.file}" class="nav-chapter-link">
                        <span class="nav-chapter-icon">${ch.icon}</span>
                        <span class="nav-chapter-number">${ch.number}</span>
                        <span class="nav-chapter-title">${ch.title}</span>
                    </a>
                </li>
            `).join('');
    }

    // ============================================
    // 生成工具列表 Generate Tool List
    // ============================================
    function generateToolList() {
        return TOOLS.map(tool => `
            <li class="nav-tool-item">
                <a href="${tool.file}" class="nav-tool-link" target="_blank">
                    <span class="nav-tool-icon">${tool.icon}</span>
                    <span class="nav-tool-title">${tool.title}</span>
                </a>
            </li>
        `).join('');
    }

    // ============================================
    // 创建面包屑导航 Create Breadcrumb Navigation
    // ============================================
    function createBreadcrumb() {
        const currentChapter = getCurrentChapter();
        if (!currentChapter) return null;

        const breadcrumb = document.createElement('nav');
        breadcrumb.className = 'breadcrumb-nav';
        breadcrumb.setAttribute('aria-label', '面包屑导航');

        breadcrumb.innerHTML = `
            <ol class="breadcrumb-list">
                <li class="breadcrumb-item">
                    <a href="index.html" class="breadcrumb-link">📚 首页</a>
                </li>
                <li class="breadcrumb-separator">›</li>
                <li class="breadcrumb-item">
                    <span class="breadcrumb-category">${currentChapter.category === 'core' ? '核心章节' : '扩展专题'}</span>
                </li>
                <li class="breadcrumb-separator">›</li>
                <li class="breadcrumb-item breadcrumb-current">
                    <span>${currentChapter.icon} ${currentChapter.title}</span>
                </li>
            </ol>
        `;

        return breadcrumb;
    }

    // ============================================
    // 创建快捷键帮助面板 Create Shortcuts Panel
    // ============================================
    function createShortcutsPanel() {
        const panel = document.createElement('div');
        panel.id = 'shortcuts-panel';
        panel.className = 'shortcuts-panel';
        panel.style.display = 'none';

        panel.innerHTML = `
            <div class="shortcuts-content">
                <div class="shortcuts-header">
                    <h3>⌨️ 键盘快捷键</h3>
                    <button class="shortcuts-close" onclick="window.BookNavigation.closeShortcuts()">✕</button>
                </div>
                <div class="shortcuts-body">
                    <div class="shortcut-group">
                        <h4>📖 阅读导航</h4>
                        <div class="shortcut-item">
                            <kbd>←</kbd>
                            <span>上一章</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>→</kbd>
                            <span>下一章</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Home</kbd>
                            <span>跳转到顶部</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>End</kbd>
                            <span>跳转到底部</span>
                        </div>
                    </div>
                    <div class="shortcut-group">
                        <h4>🎯 菜单操作</h4>
                        <div class="shortcut-item">
                            <kbd>N</kbd>
                            <span>打开/关闭导航菜单</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>S</kbd>
                            <span>聚焦搜索框</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>ESC</kbd>
                            <span>关闭菜单/面板</span>
                        </div>
                    </div>
                    <div class="shortcut-group">
                        <h4>⚡ 快捷功能</h4>
                        <div class="shortcut-item">
                            <kbd>P</kbd>
                            <span>打印当前页</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>H</kbd>
                            <span>返回首页</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>?</kbd>
                            <span>显示此帮助</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return panel;
    }

    // ============================================
    // 章节搜索功能 Chapter Search Function
    // ============================================
    function handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        const chapterItems = document.querySelectorAll('.nav-chapter-item, .nav-tool-item');

        chapterItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // ============================================
    // 获取当前章节 Get Current Chapter
    // ============================================
    function getCurrentChapter() {
        const urlParams = new URLSearchParams(window.location.search);
        const chapterFile = urlParams.get('chapter');

        if (!chapterFile) return null;

        return CHAPTERS.find(ch => ch.file === chapterFile);
    }

    // ============================================
    // 切换导航菜单 Toggle Navigation Menu
    // ============================================
    function toggleNavigationMenu() {
        const menu = document.getElementById('navigation-menu');
        navState.isMenuOpen = !navState.isMenuOpen;

        if (navState.isMenuOpen) {
            menu.style.display = 'flex';
            setTimeout(() => menu.classList.add('active'), 10);
            // 聚焦到搜索框
            const searchInput = document.getElementById('nav-search');
            if (searchInput) searchInput.focus();
        } else {
            menu.classList.remove('active');
            setTimeout(() => menu.style.display = 'none', 300);
        }
    }

    // ============================================
    // 关闭导航菜单 Close Navigation Menu
    // ============================================
    function closeNavigationMenu() {
        const menu = document.getElementById('navigation-menu');
        navState.isMenuOpen = false;
        menu.classList.remove('active');
        setTimeout(() => menu.style.display = 'none', 300);
    }

    // ============================================
    // 显示快捷键面板 Show Shortcuts Panel
    // ============================================
    function showShortcutsPanel() {
        const panel = document.getElementById('shortcuts-panel');
        panel.style.display = 'flex';
        setTimeout(() => panel.classList.add('active'), 10);
    }

    // ============================================
    // 关闭快捷键面板 Close Shortcuts Panel
    // ============================================
    function closeShortcutsPanel() {
        const panel = document.getElementById('shortcuts-panel');
        panel.classList.remove('active');
        setTimeout(() => panel.style.display = 'none', 300);
    }

    // ============================================
    // 键盘快捷键处理 Keyboard Shortcuts Handler
    // ============================================
    function handleKeyboardShortcuts(event) {
        // 忽略在输入框中的按键
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            if (event.key === 'Escape') {
                event.target.blur();
            }
            return;
        }

        switch(event.key.toLowerCase()) {
            case 'n':
                event.preventDefault();
                toggleNavigationMenu();
                break;
            case 's':
                event.preventDefault();
                toggleNavigationMenu();
                setTimeout(() => {
                    const searchInput = document.getElementById('nav-search');
                    if (searchInput) searchInput.focus();
                }, 100);
                break;
            case 'escape':
                event.preventDefault();
                closeNavigationMenu();
                closeShortcutsPanel();
                break;
            case 'p':
                if (!event.ctrlKey && !event.metaKey) {
                    event.preventDefault();
                    window.print();
                }
                break;
            case 'h':
                if (!event.ctrlKey && !event.metaKey) {
                    event.preventDefault();
                    window.location.href = 'index.html';
                }
                break;
            case '?':
                event.preventDefault();
                showShortcutsPanel();
                break;
            case 'home':
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'end':
                event.preventDefault();
                window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
                break;
        }
    }

    // ============================================
    // 初始化导航系统 Initialize Navigation System
    // ============================================
    function initializeNavigation() {
        // 创建所有导航元素
        const floatingButton = createFloatingNavButton();
        const navMenu = createNavigationMenu();
        const shortcutsPanel = createShortcutsPanel();
        const breadcrumb = createBreadcrumb();

        // 添加到DOM
        document.body.appendChild(floatingButton);
        document.body.appendChild(navMenu);
        document.body.appendChild(shortcutsPanel);

        // 添加面包屑到页面顶部
        if (breadcrumb) {
            const container = document.querySelector('.container') || document.body;
            container.insertBefore(breadcrumb, container.firstChild);
        }

        // 绑定键盘事件
        document.addEventListener('keydown', handleKeyboardShortcuts);

        // 点击外部关闭菜单
        document.addEventListener('click', (e) => {
            const menu = document.getElementById('navigation-menu');
            const button = document.getElementById('floating-nav-button');

            if (navState.isMenuOpen &&
                !menu.contains(e.target) &&
                !button.contains(e.target)) {
                closeNavigationMenu();
            }
        });

        console.log('✅ 导航系统初始化完成');
    }

    // ============================================
    // 暴露公共API Expose Public API
    // ============================================
    window.BookNavigation = {
        init: initializeNavigation,
        toggleMenu: toggleNavigationMenu,
        closeMenu: closeNavigationMenu,
        showShortcuts: showShortcutsPanel,
        closeShortcuts: closeShortcutsPanel,
        chapters: CHAPTERS,
        tools: TOOLS,
        state: navState
    };

    // 自动初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeNavigation);
    } else {
        initializeNavigation();
    }

})();
