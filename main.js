// ==UserScript==
// @name         MathJax Renderer
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Render LaTeX math formulas on the page using MathJax
// @match        https://claude.ai/*
// @grant        none
// ==/UserScript==

(function () {
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
        CommonHTML: {linebreaks: {automatic: true}},
        "HTML-CSS": {linebreaks: {automatic: true}},
        SVG: {linebreaks: {automatic: true}}
    };

    // 触发渲染函数
    function renderMathJax() {
        for (var i = 0; i < 2; i++) {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
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
    button.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    button.style.cursor = 'pointer';
    button.style.transition = 'background-color 0.3s, transform 0.1s';

    // 鼠标移入移出效果
    button.addEventListener('mouseenter', function () {
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    });
    button.addEventListener('mouseleave', function () {
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    });

    // 点击效果
    button.addEventListener('mousedown', function () {
        button.style.transform = 'scale(0.95)';
    });
    button.addEventListener('mouseup', function () {
        button.style.transform = 'scale(1)';
    });

    document.body.appendChild(button);

    // 点击按钮时重新渲染
    button.addEventListener('click', renderMathJax, false);

    // 首次渲染
    window.addEventListener('load', renderMathJax, false);
})();
