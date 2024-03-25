// ==UserScript==
// @name         MathJax Renderer
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Render LaTeX math formulas on the page using MathJax
// @match        https://claude.ai/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var xpaths = [
        '/html/body/div[4]/div/div[3]/div[1]',
        '/html/body/div[3]/div/div[3]/div[1]'
    ];

    // 加载 MathJax 库
    const script = document.createElement('script');
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
        CommonHTML: {linebreaks: {automatic: true}},
        "HTML-CSS": {linebreaks: {automatic: true}},
        SVG: {linebreaks: {automatic: true}}
    };

    // 检测页面中是否存在数学公式
    function hasMathFormulas() {
        return document.body.textContent.includes('$') ||
            document.body.textContent.includes('\\(') ||
            document.body.textContent.includes('\\[');
    }

    function getElementByXPath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }


    // 触发渲染函数
    function renderMathJax() {
        if (window.MathJax && window.MathJax.Hub) {
            // 将XPath转换为元素
            var elements = xpaths.map(getElementByXPath).filter(element => element !== null);

            if (elements.length > 0) {
                // 对每个元素进行渲染
                elements.forEach(element => {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
                });
            }
        }
    }

    // 监听 DOM 变化并重新渲染
    var observer = new MutationObserver(function (mutations) {
        if (hasMathFormulas()) {
            renderMathJax();
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
