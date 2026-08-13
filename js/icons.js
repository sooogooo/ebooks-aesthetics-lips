/**
 * 《绛唇解语花》图标系统
 * 线性图标 · 24×24 网格 · 1.6px 描边 · currentColor 着色
 * 替换全站 emoji，风格统一、可主题化
 *
 * 用法：
 *   <i data-icon="book"></i>          // 自动渲染
 *   <span class="icon-book"></span>   // 配合 css/icons.css
 *   Icons.get('book')                  // 返回 SVG 字符串
 */
(function() {
    'use strict';

    const S = (paths) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

    const ICONS = {
        /* 导航类 */
        menu:    S('<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>'),
        close:   S('<line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>'),
        search:  S('<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
        home:    S('<path d="M3 11.5L12 4l9 7.5"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>'),
        print:   S('<path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 01-2-2v-4a2 2 0 012-2h16a2 2 0 012 2v4a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8" rx="1"/>'),
        arrowLeft:  S('<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>'),
        arrowRight: S('<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>'),
        chevronRight: S('<polyline points="9 6 15 12 9 18"/>'),
        chevronDown:  S('<polyline points="6 9 12 15 18 9"/>'),
        back:    S('<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>'),

        /* 章节主题类 */
        book:        S('<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>'),
        bookOpen:    S('<path d="M12 7v14"/><path d="M3 5v14h6a3 3 0 013 3 3 3 0 013-3h6V5h-6a3 3 0 00-3 3 3 3 0 00-3-3H3z"/>'),
        globe:       S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 010 18 14 14 0 010-18z"/>'),
        flask:       S('<path d="M9 3h6"/><path d="M10 3v6L5.5 18a2 2 0 001.8 3h9.4a2 2 0 001.8-3L14 9V3"/><line x1="8.5" y1="14" x2="15.5" y2="14"/>'),
        clipboard:   S('<rect x="8" y="3" width="8" height="4" rx="1"/><path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>'),
        zap:         S('<polygon points="13 2 4 14 11 14 10 22 19 10 12 10 13 2"/>'),
        target:      S('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>'),
        wrench:      S('<path d="M14.5 2.5a4.5 4.5 0 00-6.3 6.3L3 14v7h7l5.2-5.2a4.5 4.5 0 006.3-6.3l-3.5 3.5-3-3 3.5-3.5z"/>'),
        stethoscope: S('<path d="M4 3v6a4 4 0 008 0V3"/><path d="M4 3H3M12 3h-1"/><path d="M8 17v2a4 4 0 008 0v-3"/><circle cx="18" cy="13" r="2"/>'),
        palette:     S('<circle cx="12" cy="12" r="9"/><circle cx="8" cy="9" r="1"/><circle cx="16" cy="9" r="1"/><circle cx="9" cy="15" r="1"/><path d="M12 21a3 3 0 003-3c0-1.5-1.5-2-1.5-3.5a2 2 0 012-2h1.5a3 3 0 003-3"/>'),
        pill:        S('<rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(45 12 12)"/><line x1="9" y1="9" x2="15" y2="15"/>'),
        shield:      S('<path d="M12 2L4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4z"/>'),
        layers:      S('<polygon points="12 2 22 8 12 14 2 8 12 2"/><polyline points="2 13 12 19 22 13"/>'),
        fileText:    S('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="8" y1="9" x2="10" y2="9"/>'),

        /* 功能类 */
        share:       S('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.6" y1="10.7" x2="15.4" y2="6.3"/><line x1="8.6" y1="13.3" x2="15.4" y2="17.7"/>'),
        link:        S('<path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1"/><path d="M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/>'),
        copy:        S('<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>'),
        qrCode:      S('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><line x1="14" y1="14" x2="14" y2="14"/><line x1="18" y1="14" x2="18" y2="14"/><line x1="14" y1="18" x2="14" y2="18"/><line x1="18" y1="18" x2="18" y2="18"/><line x1="21" y1="14" x2="21" y2="14"/><line x1="14" y1="21" x2="14" y2="21"/><rect x="17" y="17" width="4" height="4" rx="0.5"/>'),
        wechat:      S('<path d="M9 4C5.1 4 2 6.5 2 9.6c0 1.8 1 3.4 2.6 4.4L4 16l2.3-1.2c.5.1 1 .2 1.5.2"/><path d="M22 14.5c0-2.6-2.5-4.7-5.6-4.7s-5.6 2.1-5.6 4.7 2.5 4.7 5.6 4.7c.6 0 1.2-.1 1.7-.2L20 20l-.5-1.8c1.5-.8 2.5-2.1 2.5-3.7z"/><circle cx="6.5" cy="8" r=".6" fill="currentColor"/><circle cx="11" cy="8" r=".6" fill="currentColor"/><circle cx="14.5" cy="14" r=".6" fill="currentColor"/><circle cx="18" cy="14" r=".6" fill="currentColor"/>'),
        moments:     S('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>'),
        keyboard:    S('<rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="10" x2="6" y2="10"/><line x1="10" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="14" y2="10"/><line x1="18" y1="10" x2="18" y2="10"/><line x1="7" y1="14" x2="17" y2="14"/>'),

        /* 信息/状态类 */
        info:        S('<circle cx="12" cy="12" r="9"/><line x1="12" y1="11" x2="12" y2="16"/><circle cx="12" cy="8" r=".6" fill="currentColor"/>'),
        warning:     S('<path d="M10.3 3.8L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.8a2 2 0 00-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>'),
        alertMedical:S('<path d="M12 2L4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4z"/><line x1="12" y1="8" x2="12" y2="14"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>'),
        lock:        S('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>'),
        robot:       S('<rect x="4" y="8" width="16" height="12" rx="2"/><path d="M12 8V4"/><circle cx="12" cy="3" r=".8"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/><line x1="9.5" y1="17" x2="14.5" y2="17"/>'),
        mapPin:      S('<path d="M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13z"/><circle cx="12" cy="9" r="2.5"/>'),
        mail:        S('<rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/>'),
        phone:       S('<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.1-1.1a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z"/>'),
        globe2:      S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 010 18 14 14 0 010-18z"/>'),
        file:        S('<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>'),

        /* 评估工具类 */
        lipAssess:   S('<path d="M7 6c-2 0-3 2-3 4s1 3 2 4c1.5 1.5 3 2 6 2s4.5-.5 6-2c1-1 2-2 2-4s-1-4-3-4"/><path d="M4 10c-1.5 0-2 1-2 2s.5 2 2 2"/><path d="M20 10c1.5 0 2 1 2 2s-.5 2-2 2"/><path d="M9 9c0-1 1-1.5 1.5-1.5M13 9c0-1 1-1.5 1.5-1.5"/>'),
        chart:       S('<line x1="4" y1="20" x2="4" y2="10"/><line x1="10" y1="20" x2="10" y2="4"/><line x1="16" y1="20" x2="16" y2="14"/><line x1="22" y1="20" x2="2" y2="20"/>'),
        activity:    S('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),
        smile:       S('<circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="9" r=".6" fill="currentColor"/><circle cx="15" cy="9" r=".6" fill="currentColor"/>'),
        siren:       S('<path d="M7 18v-6a5 5 0 0110 0v6"/><path d="M5 21h14"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="4" y1="6" x2="5.5" y2="7.5"/><line x1="20" y1="6" x2="18.5" y2="7.5"/>')
    };

    /** 返回 SVG 字符串 */
    function get(name) {
        return ICONS[name] || '';
    }

    /** 渲染页面上所有 <i data-icon="xxx"> */
    function renderAll(root) {
        (root || document).querySelectorAll('[data-icon]').forEach(el => {
            const name = el.getAttribute('data-icon');
            const svg = get(name);
            if (svg) {
                el.innerHTML = svg;
                el.classList.add('icon');
            }
        });
    }

    const Icons = { get, renderAll, ICONS };

    // 自动渲染
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => renderAll());
    } else {
        renderAll();
    }

    window.Icons = Icons;
})();
