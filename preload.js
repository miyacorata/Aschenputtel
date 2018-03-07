var style = document.createElement('style');
style.textContent = 'body::-webkit-scrollbar{display: none;}';

window.onload = function(){
    document.head.appendChild(style);
}

//"use strict";
// var wv = document.querySelector("webview");
// wv.addEventListener("dom-ready",() => {
//     wv.insertCSS("*::-webkit-scrollbar{display: none;}");
// });
