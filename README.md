# Claude_Latex_Renderer
Fixed an issue where claude.ai could not be rendered using Latex

## Demo
https://github.com/kivvi3412/Claude_Latex_Renderer/assets/64115433/b5a41956-b8ec-4682-b48f-1a293f48410a

## Installation
Create a tampermonkey script
<img width="1248" alt="iShot_2024-03-25_14 43 12" src="https://github.com/kivvi3412/Claude_Latex_Renderer/assets/64115433/03b4c0ce-0e7d-4653-ad5b-8971e7b0b460">

## Code
```
// ==UserScript==
// @name         MathJax Renderer
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Render LaTeX math formulas on the page using MathJax
// @match        https://claude.ai/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var className = 'flex-1  flex  flex-col  gap-3  px-4  pt-16';

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

    function getElementsByClassName(className) {
        return document.getElementsByClassName(className);
    }


    // 触发渲染函数
    function renderMathJax() {
        if (window.MathJax && window.MathJax.Hub) {
            // 通过类名获取元素
            var elements = getElementsByClassName(className);

            if (elements.length > 0) {
                // 对每个元素进行渲染
                for (var i = 0; i < elements.length; i++) {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, elements[i]]);
                }
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
```

