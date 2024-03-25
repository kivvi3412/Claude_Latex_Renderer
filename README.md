# Claude_Latex_Renderer
Fixed an issue where claude.ai could not be rendered using Latex

## Demo
https://github.com/kivvi3412/Claude_Latex_Renderer/assets/64115433/b5a41956-b8ec-4682-b48f-1a293f48410a

## Installation
Create a tampermonkey script
<img width="1248" alt="iShot_2024-03-25_14 43 12" src="https://github.com/kivvi3412/Claude_Latex_Renderer/assets/64115433/03b4c0ce-0e7d-4653-ad5b-8971e7b0b460">

## Code
```js
// ==UserScript==
// @name         MathJax Renderer
// @namespace    http://tampermonkey.net/
// @version      0.4
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

    // 创建渲染按钮
    var button = document.createElement('button');
    button.textContent = 'Render Latex';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = '9999';
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.borderRadius = '5px';
    button.style.border = '2px solid #333';
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    button.style.cursor = 'pointer';
    button.style.transition = 'background-color 0.3s, transform 0.1s';

    // 鼠标移入移出效果
    button.addEventListener('mouseenter', function() {
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    });
    button.addEventListener('mouseleave', function() {
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    });

    // 点击效果
    button.addEventListener('mousedown', function() {
        button.style.transform = 'scale(0.95)';
    });
    button.addEventListener('mouseup', function() {
        button.style.transform = 'scale(1)';
    });

    document.body.appendChild(button);

    // 点击按钮时重新渲染
    button.addEventListener('click', renderMathJax, false);

    // 首次渲染
    window.addEventListener('load', renderMathJax, false);
})();
```

