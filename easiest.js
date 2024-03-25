// ==UserScript==
// @name         MathJax Renderer
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Render LaTeX math formulas on the page using MathJax
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 插入 MathJax 库
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-AMS_CHTML';
    document.getElementsByTagName('head')[0].appendChild(script);

    // 配置 MathJax
    window.MathJax = {
        tex2jax: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true
        },
        CommonHTML: { linebreaks: { automatic: true } },
        "HTML-CSS": { linebreaks: { automatic: true } },
        SVG: { linebreaks: { automatic: true } }
    };

    // 触发渲染函数
    function renderMathJax() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    }

    // 首次渲染
    window.addEventListener('load', renderMathJax, false);

    // 监听 DOM 变化并重新渲染
    var observer = new MutationObserver(function(mutations) {
        renderMathJax();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
